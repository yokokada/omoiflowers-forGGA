import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../pages/Firebase';
import {Input ,Button} from "@nextui-org/react";

const DisplayNameSetting = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);  // 初期値をnullに設定
    const [loading, setLoading] = useState(true);

    const [displayName, setDisplayName] = useState("");
    const [isPasswordResetVisible, setPasswordResetVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");  // 追加
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ用のステートを追加

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);  // ユーザー情報が取得されたらloadingをfalseにする
        });

        return () => unsubscribe();  // クリーンアップ関数
    }, []);

    useEffect(() => {
        if (user !== null) {
            setDisplayName(user.displayName);
            setLoading(false);
        }else {
            setLoading(false);  // エラー時も読み込み状態を解除する
        }
    }, [user]);

    const handleDisplayNameSave = async () => {
        if (user) {
            await updateProfile(user, {
                displayName: displayName
            });
            // Firestoreにも更新を保存
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { displayName: displayName });
        }
    };

    const handlePasswordReset = () => {
        setPasswordResetVisible(!isPasswordResetVisible);
    };

    const handleUpdatePassword = async () => {
        if (password !== confirmPassword) {
            console.error("新しいパスワードと確認用のパスワードが一致していません");
            return;
        }

        const credential = EmailAuthProvider.credential(
            user.email, 
            currentPassword
        );

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, password);
            console.log("パスワードが更新されました");
            setErrorMessage('');  // 成功した場合はエラーメッセージをクリアする
        } catch (error) {
            console.error("エラー:", error.message);
            setErrorMessage(error.message);  // エラーメッセージを設定する
        }
    };
    if (loading) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className='form'>
        <header>
            <h2>表示名変更</h2>
        </header>
        <main>
            {errorMessage && <p style={{color: 'red', textAlign: 'center'}}>{errorMessage}</p>}
            <form>
                <Input
                    isRequired
                    name="displayName"
                    type="text"
                    label="表示名"
                    placeholder="8文字以内で記入"
                    className="max-w-xs input-spacing"
                    variant="bordered"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={{ fontSize: '17px' }}
                />
                <Button style={{ backgroundColor:'#1B3672',color:'white' }} type="button" onClick={handleDisplayNameSave}>
                    表示名を変更
                </Button>
                <br />
                <div className='passwordChangeToggle'>
                <a href="#" className="underlineLink" onClick={handlePasswordReset}>パスワード再設定する場合はコチラ</a>
                </div>
                
                {isPasswordResetVisible && (
                    <>
                        <Input
                            isRequired
                            label="現在のパスワード"
                            variant="bordered"
                            placeholder="現在のパスワードを入力"
                            type="password"
                            className="max-w-xs input-spacing"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ fontSize: '17px' }}
                        />
                        <Input
                            isRequired
                            label="新しいパスワード"
                            variant="bordered"
                            placeholder="英数字8文字以上"
                            type="password"
                            className="max-w-xs input-spacing"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ fontSize: '17px' }}
                        />
                        <Input
                            isRequired
                            label="パスワード確認"
                            variant="bordered"
                            placeholder="上記と同じパスワードを入力"
                            type="password"
                            className="max-w-xs input-spacing"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ fontSize: '17px' }}
                        />
                        <Button style={{ backgroundColor:'#1B3672',color:'white' ,marginBottom:'50px'}} type="button" onClick={handleUpdatePassword}>
                            パスワードを更新
                        </Button>
                    </>
                )}
            </form>
        </main>
    </div>
    );
};

export default DisplayNameSetting;

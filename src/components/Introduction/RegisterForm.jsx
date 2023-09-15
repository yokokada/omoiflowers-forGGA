import React, { useState } from 'react';
import { auth } from '../../pages/Firebase';
import { useNavigate  } from 'react-router-dom';  // Linkコンポーネントをインポート
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import SubmitButton from '../common/SubmitButtun';
import '../common/Form.css'
import { getDoc, setDoc, doc, collection, query, where, getDocs, updateDoc  } from "firebase/firestore";  // Firestoreの関数をインポート
import { db } from '../../pages/Firebase';  // Firestoreのインスタンスをインポー

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '' || displayName === '') {
            setErrorMessage('全てのフィールドを入力してください。');
            return;
        } else if (displayName.length > 8) {  // 表示名が8文字以上かチェック
            setErrorMessage('表示名は8文字以内で入力してください。');
            return;
        } else if (password.length < 8) {
            setErrorMessage('パスワードは8文字以上で入力してください。');
            return;
        } else if (password !== confirmPassword) { // パスワードと確認が一致するかチェック
            setErrorMessage('パスワードが一致しません。');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: displayName
                });
            // 新しいユーザーをFirestoreに登録する
            const userDocRef = doc(db, 'users', user.uid);  
            const q = query(collection(db, 'tails'), where('members', 'array-contains', user.uid));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                const tailName = `${displayName}'s tails`;
                const tailRef = doc(collection(db, 'tails'));
                await setDoc(tailRef, {
                    name: tailName,
                    owner: user.uid,
                    subAdmin: null,
                    members: [user.uid],
                    createdAt: new Date()
                });
                await setDoc(userDocRef, {
                    email: email,
                    displayName: displayName,
                    avatar: null,
                    birthDate: null,
                    adminFlag: 0,
                    tail: tailRef.id
                });
            } else {
                const tailDoc = querySnapshot.docs[0];
                const tailData = tailDoc.data();
                if (!tailData.subAdmin) {
                    await updateDoc(doc(db, 'tails', tailDoc.id), {
                        subAdmin: user.uid,
                        members: [...tailData.members, user.uid] 
                    });
                    await setDoc(userDocRef, {
                        email: email,
                        displayName: displayName,
                        avatar: null,
                        birthDate: null,
                        adminFlag: 1,
                        tail: tailDoc.id
                    });
                } else {
                    await setDoc(userDocRef, {
                        email: email,
                        displayName: displayName,
                        avatar: null,
                        birthDate: null,
                        adminFlag: 2,
                        tail: tailDoc.id
                    });
                    await updateDoc(doc(db, 'tails', tailDoc.id), {
                        members: [...tailData.members, user.uid]
                    });
                }
            }

                console.log('アカウント作成成功:', user, user.displayName);
                setErrorMessage('');
                setAccountCreated(true);  // アカウント作成成功時にポップアップを表示
                navigate('/login'); // この行を追加：アカウント作成成功後にログイン画面に遷移
                } else {
                    setErrorMessage('ユーザーが正しく作成されませんでした。');
                }

        } catch (error) {
            console.error("Error during account creation:", error); 
            // Firebaseのエラーコードをチェックして適切なメッセージを設定する
        if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('このメールアドレスは既に使用されています。');
        } else {
            setErrorMessage('アカウントの作成中にエラーが発生しました。');
        }
        }
    };


  return (
    <div className='form'>
        <header>
         <h1 className="text-center">アカウント作成</h1>
        </header>
        <main>
            <form className='RegisterForm' onSubmit={handleSubmit}>
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
             <Input
                isRequired
                name="email"
                type="email"
                label="Email"
                placeholder="Emailaアドレスを入力"
                className="max-w-xs input-spacing"
                variant="bordered"
                value={email}
                            onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: '17px' }}
            />
            <Input
                isRequired
                label="Password"
                variant="bordered"
                placeholder="英数字8文字以上"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs input-spacing"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontSize: '17px' }}
                    
            />
            <Input
                isRequired
                label="Password確認"
                variant="bordered"
                placeholder="上記と同じパスワードを入力"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs input-spacing"
                value={confirmPassword} // パスワード確認用のステートをバインド
                onChange={(e) => setConfirmPassword(e.target.value)} // パスワード確認用のステートを更新
                style={{ fontSize: '17px' }}
            />
            <SubmitButton>登録する</SubmitButton>
            </form>
        </main>
    </div>  
  );
};

export default RegisterForm

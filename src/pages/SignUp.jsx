import React, { useState } from 'react';
import { auth } from './Firebase';
import { Link } from 'react-router-dom';  // Linkコンポーネントをインポート
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CustomModal from '../components/common/CustomModal';  // CustomModalをインポート

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '' || displayName === '') {
            setErrorMessage('全てのフィールドを入力してください。');
            return;
        } else if (password.length < 8) {
            setErrorMessage('パスワードは8文字以上で入力してください。');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: displayName
                });
                console.log('アカウント作成成功:', user);
                setErrorMessage('');
                setAccountCreated(true);  // アカウント作成成功時にポップアップを表示
                } else {
                    setErrorMessage('ユーザーが正しく作成されませんでした。');
                    return;
                }

        } catch (error) {
            console.error("Error during account creation:", error); 
            setErrorMessage('アカウントの作成中にエラーが発生しました。');
        }
    };

    return (
        <div>
            <header>
                <h1 className="text-center">アカウント作成</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="displayName">表示名</label>
                        <input 
                            id="displayName" 
                            name="displayName"
                            type="text" 
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">メールアドレス</label>
                        <input 
                            id="email" 
                            name="email"
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">パスワード</label>
                        <input 
                            id="password" 
                            name="password"
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div>{errorMessage}</div>}
                    <div>
                        <button type="submit">アカウント作成</button>
                    </div>
                </form>
            </main>
            <CustomModal isOpen={accountCreated} onClose={() => setAccountCreated(false)}>
                <p>アカウントが作成されました！</p>
                <Link to="/login" className="login-button">ログイン画面へ</Link>
            </CustomModal>
        </div>
    );
}

export default SignUp;

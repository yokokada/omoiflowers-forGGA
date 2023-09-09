
import React, { useState } from 'react';
import { auth } from './Firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import { Link, useNavigate } from 'react-router-dom';  // <-- `useNavigate`を追加


// firebaseでのログイン機能を実装する
const Login = () => {
// 状態変数の定義
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態
const navigate = useNavigate();  // <-- この行を追加



// ーーーーーー登録した人がログインする時の処理ーーーーーーーーーーーー
const handleSubmit = (e) => {
    e.preventDefault(); // フォームの送信をキャンセル

    // 入力値のエラーハンドリング
    if (email === '' || password === '') {
        setErrorMessage('メールアドレスとパスワードを入力してください。');
        return;
    } else if (password.length < 8) {
        setErrorMessage('パスワードは8文字以上で入力してください。');
        return;
    }

    //ーーーーーーサインイン処理ーーーーーーーーーーーー
       signInWithEmailAndPassword(auth, email, password)  // <- ここを変更しました
       .then((userCredential) => {
         // ログイン成功時の処理
         console.log('ログイン成功:', userCredential.user);
         setErrorMessage(''); // エラーメッセージをリセット
         navigate('/dashboard');  // <-- この行を修正
       })
       .catch((error) => {
         // ログイン失敗時のエラーハンドリング
         switch (error.code) {
           case 'auth/user-not-found':
             setErrorMessage('ユーザーが見つかりません。');
             break;
           case 'auth/wrong-password':
             setErrorMessage('パスワードが間違っています。');
             break;
           case 'auth/invalid-email':
             setErrorMessage('メールアドレスの形式が正しくありません。');
             break;
           default:
             setErrorMessage('ログインに失敗しました。しばらく経ってから再度お試しください。');
             break;
         }
       });
   };

// ーーーーーーー実際の表示はここからーーーーーーーーーーーー
return (
    <div>
        <header>
            <h1 className="text-center">ログイン画面</h1>
        </header>
        <main>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">メールアドレス</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                {errorMessage && <div>{errorMessage}</div>}
                <div>
                    <button type="submit">ログイン</button>
                </div>
            </form>
            <div>
                アカウントを持っていないですか？
                <Link to="/signup">新規登録</Link>
            </div>
        </main>
    </div>
);
}

export default Login;
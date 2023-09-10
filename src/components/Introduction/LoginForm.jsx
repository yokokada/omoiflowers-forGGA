
import React, { useState } from 'react';
import { auth } from '../../pages/Firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import { Link, useNavigate } from 'react-router-dom';  // <-- `useNavigate`を追
// Form.cssをインポート
import '../common/Form.css';
import SubmitButton from '../common/SubmitButtun';
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";


// firebaseでのログイン機能を実装する
const LoginForm = () => {
// 状態変数の定義
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態
const navigate = useNavigate();  // <-- この行を追加
const [isVisible, setIsVisible] = useState(false);


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

// ーーtoggleVisibility関数----
const toggleVisibility = () => {
    setIsVisible(!isVisible);
};

// ーーーーーーー実際の表示はここからーーーーーーーーーーーー
return (
    <div>
        <header className='form'>
            <h1 className="text-center">ログイン画面</h1>
        </header>
        <main>
            <form  className='RegisterForm' onSubmit={handleSubmit}>
                <Input
                    isRequired
                    name="email"
                    type="email"
                    label="Email"
                    className="max-w-xs input-spacing"
                    variant="bordered"
                    value={email}
                                onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    isRequired
                    label="Password"
                    variant="bordered"
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
                        
                />
                {errorMessage && <div>{errorMessage}</div>}
                <SubmitButton>ログイン</SubmitButton>
            </form>
            <div className='messege'> 
                アカウントを持っていない場合は
                <Link to="/Register" className="underline">新規登録</Link>へ
            </div>
        </main>
    </div>
);
}

export default LoginForm;
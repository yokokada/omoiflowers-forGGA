# React + Vite
## 下記使用したUIコンポーネント
- [https://nextui.org/docs/guide/introduction]
- [https://iconoir.com/]

## 未解決問題
- ### dashboad/AnimationComponent.jsx
 　firebaseからの読み込みの時間がかかりすぎるなんとかしたい
 
- ### dashboad/clickcountPKF/KeyParsonClickCount.jsx
1. カウントダウンの未表示
2. トグルボタン閉じた時に元の配置に戻らない
　トグル閉じた位置をセットしてしまっている様子
3. ClickHistoryのテーブルがなぜか中央配置にならない
　上のテーブルの挙動による様子
**上記、同様のことがフレンド画面でも予測されるため、一旦Dashboadはやめて違うページを作ることにする**

- ### components/Introduction/RegisterForm.jsx
　バリデーションのエラーはまだ出ないが、一旦firebaseへの登録は実装できたので、違うページに移行
　(9/10 13:40)

- ### components/Introduction/LoginForm.jsx
　バリデーションのエラーはまだ出ないが、一旦firebaseへの登録は実装できたので、違うページに移行
　(9/10 16:00 2時間かかってる💦)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

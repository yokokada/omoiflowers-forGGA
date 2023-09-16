# React + Vite
## 下記使用したUIコンポーネント
- [https://nextui.org/docs/guide/introduction]
- [https://iconoir.com/]
- [https://chatscope.io/]
- [https://devexpress.github.io/devextreme-reactive/demos/]
- [https://projects.wojtekmaj.pl/react-calendar/]

## 未解決問題
- ### dashboad/AnimationComponent.jsx
 　firebaseからの読み込みの時間がかかりすぎるなんとかしたい
 
- ### dashboad/clickcountPKF/KeyParsonClickCount.jsx
1. カウントダウンの未表示
2. トグルボタン閉じた時に元の配置に戻らない
　トグル閉じた位置をセットしてしまっている様子
**上記、同様のことがフレンド画面でも予測されるため、一旦Dashboadはやめて違うページを作ることにする**

- ### components/Introduction/RegisterForm.jsx
　バリデーションのエラーはまだ出ないが、一旦firebaseへの登録は実装できたので、違うページに移行
　(9/10 13:40)

- ### components/Introduction/LoginForm.jsx
　バリデーションのエラーはまだ出ないが、一旦firebaseへの登録は実装できたので、違うページに移行
　(9/10 16:00 2時間かかってる💦)

- ### /pages/Chat.jsx
　以下の記事を参考にchat-ui-kit-reactを導入。一旦見た目はできた。firebaseとの連携とかはまだ実装していない。ライブラリ選んだりするのに時間がかかった。
　（9/10 18:45）
[https://qiita.com/Ueken3pei/items/a4290883840b23019742]

- ### /pages/Calendar.jsx
　react-clendarを入れて、実装。ここにスタンプをつけたい。日付の詳細画面はまだ未実装。とりあえず、次のページに。（9/10 21:00）

- ### /pages/Settings.jsx
　/components/common/AvatarUploader.jsx作成
　strageに画像保存して表示できた。dbにはjsonが入っている様子
　/components/settings/DisplayNameSetting.jsxうまくauthからDisplayNameを取り出せない、とりあえず、寝る（9/11-20:00~9/12 2:00）

- ### db構造の設定し直し
users[email,displayName,avatar,birthDate,adminFlag,tail]
tails[name,owner,subAdmin,members,createdAt]
を作成。User's tailsに紐付けて、clicksを登録しようとしたが、うまくできず、一旦どんなtailの人でもすべてクリックする仕様のままになっている。
tailsに紐付けてユーザーを招待するために招待するロジックを考え中。一旦保存することとする。
（9/12 14:20）

- ### components/common/AvatarUploader.jsx
　アバターのURLを取得できない登録はできる
　結構頑張ったけど、無理

- ### 背景色のボタンによる設定変更
　components/common/Navbar.css
　/components/common/FooterPK.jsx
　ヘッダーとフッターの色が変わらない（9/13 3:00）
　ヘッダーとフッターの色は設定できたものの、ページによってうまく背景が変わっていないところがあり、後で調整の必要あり。
- Dashboard.jsx : ヘッダーの色が変わらない
- Chat.jsx : 全ての色が変わらない
- AddMember.jsx  :  ヘッダーが透過している
- Clender.jsx : ヘッダー、フッターの色が変わらない
- Setting.jsx : body下半分とフッターの色が変わらない
- Imformation.jsx : 全部色が変わらない


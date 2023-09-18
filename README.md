# React + Vite
## 下記使用したUIコンポーネント
- [https://nextui.org/docs/guide/introduction]
- [https://iconoir.com/]
- [https://chatscope.io/]
- [https://devexpress.github.io/devextreme-reactive/demos/]
- [https://projects.wojtekmaj.pl/react-calendar/]

## 未解決問題

- ### dashboad/clickcountPKF/KeyParsonClickCount.jsx
1. カウントダウンの未表示
2. トグルボタン閉じた時に元の配置に戻らない
　トグル閉じた位置をセットしてしまっている様子
**上記、同様のことがフレンド画面でも予測されるため、一旦Dashboadはやめて違うページを作ることにする**


- ### /pages/Calendar.jsx
　react-clendarを入れて、実装。ここにスタンプをつけたい。日付の詳細画面はまだ未実装。とりあえず、次のページに。（9/10 21:00）

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

- ### /pages/Chat.jsx
　以下の記事を参考にchat-ui-kit-reactを導入。
　（9/10 18:45）
[https://qiita.com/Ueken3pei/items/a4290883840b23019742]
firebaseと連携し、保存はできるが、imgの表示まだできていない。
一斉送信を上記のchat-ui-kit-reactと別にしたが、干渉しているようで、エラーが出る（表示はできる）
あとはグループチャットのようになっているし、全員がみんなのチャットを観れるのでなんとかしたいが、
一旦一斉送信は実装できたので次に進む。自分ともチャットできるw




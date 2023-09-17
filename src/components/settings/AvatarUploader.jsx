import React, { useState ,useEffect}  from 'react'
import {Avatar} from "@nextui-org/react";
import { storage,db } from '../../pages/Firebase';
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import pica from 'pica';
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AvatarUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const avatarStyle = {
    marginTop: '100px',
    width: '160px',
    height: '160px',
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        const fetchAvatar = async () => {
          const userDocRef = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(userDocRef);
  
          if (docSnapshot.exists()) {
            setSelectedImage(docSnapshot.data().avatarURL);
            // ここでdisplayNameを取得することもできます。
            // const displayName = docSnapshot.data().displayName;
          }
        };
        fetchAvatar();
      } else {
        console.error("No user is signed in.");
      }
    });
  
    return () => unsubscribe();  // クリーンアップ関数で監視を解除
  }, []);
  


  // 画像をリサイズする関数
  const resizeImage = async (file) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = 150; // リサイズ後の幅
    canvas.height = 150; // リサイズ後の高さ

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        await pica().resize(img, canvas);
        canvas.toBlob(resolve, file.type);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

// ファイルが選択されたら実行される関数
const handleFileSelect = async (event) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is signed in.");
    return;
  }

  const currentUserId = currentUser.uid;

  const file = event.target.files[0];
  if (file) {
    const resizedImage = await resizeImage(file);

    // デバッグ用のログ
    console.log("User ID:", currentUser.uid);
    console.log("Timestamp:", Date.now());
    console.log("File Name:", file.name);

    // ファイルをFirebase Storageにアップロード
    const storagePath = `gs://omoi-flowers-app.appspot.com/avatarImages/${currentUser.uid}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    
    console.log("Storage Path:", storagePath);
    console.log("Storage Reference:", storageRef);
    

    uploadBytes(storageRef, file).then(async () => { // このコールバックを非同期関数にする
      // アップロードが成功したら、ダウンロードURLを取得
      getDownloadURL(storageRef).then(async (downloadURL) => { // このコールバックも非同期関数にする
        setSelectedImage(downloadURL); // アップロードされた画像を表示
        // FirestoreにダウンロードURLを保存
        const userDocRef = doc(db, "users", currentUserId); 
        await setDoc(userDocRef, { avatar: downloadURL }, { merge: true });
      });
    });
  }
};


const handleAvatarClick = () => {
  const fileInput = document.getElementById('file-input');
  fileInput.click();
};

  return (
        <div className='flex justify-center'>
         <input
        id='file-input'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <Avatar
        src={selectedImage}
        onClick={handleAvatarClick}
        style={avatarStyle}
      />
        </div>
  )
}
export default AvatarUploader

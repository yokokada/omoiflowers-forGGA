import React, { useState, useEffect } from 'react';
import { Avatar } from "@nextui-org/react";
import { storage, db } from '../../pages/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import pica from 'pica';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Settings.css'

const AvatarUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        const fetchAvatar = async () => {
          const userDocRef = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(userDocRef);
  
          if (docSnapshot.exists()) {
            setSelectedImage(docSnapshot.data().avatar);
          }
        };
        fetchAvatar();
      } else {
        console.error("No user is signed in.");
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const resizeImage = async (file) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        await pica().resize(img, canvas);
        canvas.toBlob(resolve, file.type);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No user is signed in.");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file);

      const storagePath = `gs://omoi-flowers-app.appspot.com/avatarImages/${currentUser.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      
      uploadBytes(storageRef, resizedImage).then(async () => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setSelectedImage(downloadURL);
          const userDocRef = doc(db, "users", currentUser.uid);
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
    <div className='avatarSetting'>
      <p>アイコン選択</p>
      <input
        id='file-input'
        type='file'
        accept='image/*'
        className='fileInput'
        onChange={handleFileSelect}
      />
      <Avatar
        src={selectedImage}
        onClick={handleAvatarClick}
        className='avatarStyle'
      />
    </div>
  );
}

export default AvatarUploader;

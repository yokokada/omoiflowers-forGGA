import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../pages/Firebase';  // あなたのFirebaseの設定をインポートします。

const DisplayNameSetting = () => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchDisplayName = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const currentDisplayName = docSnapshot.data().displayName;
          setDisplayName(currentDisplayName);
          console.log("Current DisplayName:", currentDisplayName);
        } else {
          console.error("No document found for user:", currentUser.uid);
        }
      } else {
        console.error("No user is currently signed in.");
      }
    };

    fetchDisplayName();
  }, []);

  return (
    <div>
      {/* こちらに後でdisplayNameを扱うロジックやUIを追加します */}
    </div>
  );
};

export default DisplayNameSetting;
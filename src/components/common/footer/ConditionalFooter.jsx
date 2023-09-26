import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../pages/Firebase'; // Firestoreのインスタンスをインポート
import { useLocation } from 'react-router-dom'; // <-- 追加
import { doc, getDoc } from "firebase/firestore"; // Firestoreの関数をインポート
import FooterPK from './FooterPK';
import FriendsFooter from './FriendsFooter';

const ConditionalFooter = () => {
  const [adminFlag, setAdminFlag] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // 追加

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        setAdminFlag(userDocSnapshot.data().adminFlag);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  
    return () => unsubscribe();  // cleanup function
  }, []);
  

  useEffect(() => {
    console.log("useEffect is running");
  const currentUser = auth.currentUser;
  console.log("Current user:", currentUser);  // このログが表示されるか確認
    const fetchAdminFlag = async () => {
      try {
        const currentUser = auth.currentUser;  
        if (!currentUser) return;  

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        console.log("Fetched data:", userDocSnapshot.data());  // データ確認

        setAdminFlag(userDocSnapshot.data().adminFlag);
      } catch (error) {
        console.error("Error fetching adminFlag:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminFlag();
  }, []);

  if (location.pathname === '/login') { // 追加
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;  // ローディング状態の表示
  }

  return (
    <div>
      {(adminFlag === 0 || adminFlag === 1) && <FooterPK />}
      {adminFlag === 3 && <FriendsFooter />}
    </div>
  );
};

export default ConditionalFooter;

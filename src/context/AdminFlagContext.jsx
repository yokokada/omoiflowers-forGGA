import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../pages/Firebase';
import { collection, query, where, doc, getDoc, getDocs} from 'firebase/firestore';

const AdminFlagContext = createContext();

export const useAdminFlag = () => {
  return useContext(AdminFlagContext);
};

export const AdminFlagProvider = ({ children , route }) => {
  const [adminFlag, setAdminFlag] = useState(null);
  const [uid, setUid] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [tail, setTail] = useState(null);  // tailを管理するstate
  const [isLoading, setIsLoading] = useState(true);
  const [adminZeroDisplayName, setAdminZeroDisplayName] = useState(null); // adminFlag === 0 の人のdisplayName
  const [adminZeroId, setAdminZeroId] = useState(null); // adminFlag === 0 の人のID

  useEffect(() => {
    // ログインやレジスターページで処理をスキップ
    if (route === '/login' || route === '/register') {
      return;
    }

    const fetchAdminFlag = async () => {
      const currentUser = auth.currentUser;  
      if (!currentUser) return;  

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        setAdminFlag(userDocSnapshot.data().adminFlag);
        setUid(currentUser.uid);
        setDisplayName(currentUser.displayName);
        setTail(userDocSnapshot.data().tail);  // tailを更新
      } catch (error) {
        console.error("Error fetching adminFlag:", error);
      } finally {
        setIsLoading(false);
      }
    };


  const fetchAdminZeroData = async () => {
    try {
      const q = query(collection(db, "users"), where("adminFlag", "==", 0));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        // 通常は1人だけになるはずですが、複数のユーザーが該当する可能性も考慮
        setAdminZeroDisplayName(doc.data().displayName);
        setAdminZeroId(doc.id); // IDを設定
      });
    } catch (error) {
      console.error("Error fetching adminZeroDisplayName:", error);
    }
  };
 

  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      fetchAdminFlag();
    } else {
      setIsLoading(false);
    }
  });

  fetchAdminZeroData(); // adminFlag === 0 の人のdisplayNameを取得

  return () => unsubscribe();  // cleanup function
}, [route]); // routeが変わったら再実行されるように
  

  const value = {
    adminFlag,
    uid,
    displayName,
    tail,  // tailも渡す
    isLoading,
    adminZeroDisplayName,
    adminZeroId
  };

  return (
    <AdminFlagContext.Provider value={value}>
      {children}
    </AdminFlagContext.Provider>
  );
};

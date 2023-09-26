import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../pages/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const AdminFlagContext = createContext();

export const useAdminFlag = () => {
  return useContext(AdminFlagContext);
};

export const AdminFlagProvider = ({ children }) => {
  const [adminFlag, setAdminFlag] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminFlag = async () => {
      const currentUser = auth.currentUser;  
      if (!currentUser) return;  

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        setAdminFlag(userDocSnapshot.data().adminFlag);
      } catch (error) {
        console.error("Error fetching adminFlag:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        fetchAdminFlag();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();  // cleanup function
  }, []);

  const value = {
    adminFlag,
    isLoading
  };

  return (
    <AdminFlagContext.Provider value={value}>
      {children}
    </AdminFlagContext.Provider>
  );
};

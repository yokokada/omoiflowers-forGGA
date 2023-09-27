import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // <-- 追加
import { auth } from '../../../pages/Firebase';
import TopNavbarOnlyLogo from './TopNavbarOnlyLogo';
import TopNavbar from './TopNavbar';

const ConditionalHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();  // <-- 追加

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // ログインページまたはレジスター画面には何も表示させないようにする
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div>
      {isLoggedIn ? <TopNavbar /> : <TopNavbarOnlyLogo />}
    </div>
  )
}

export default ConditionalHeader;


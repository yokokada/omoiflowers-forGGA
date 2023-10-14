import React from 'react';
import { useLocation } from 'react-router-dom'; // <-- 追加
import FooterPK from './FooterPK';
import FriendsFooter from './FriendsFooter';
import { useAdminFlag } from '../../../context/AdminFlagContext'

const ConditionalFooter = () => {
    const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得
    const location = useLocation();

    // Debugging lines
  // console.log('tail:', tail);
  // console.log('adminFlag:', adminFlag);
  // console.log('uid:', uid);
  // console.log('displayName:', displayName);
  // console.log('isLoading:', isLoading);
 
  

    // ログインページではフッターを表示しない
    if (location.pathname === '/login' || location.pathname === '/Register') {
      return null;
    }
  
    // ローディング中はローディングメッセージを表示
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // adminFlagに応じてフッターを切り替え
    return (
      <div>
        {(adminFlag === 0 || adminFlag === 1) && <FooterPK />}
        {adminFlag === 3 && <FriendsFooter />}
      </div>
    );
  };
  
  export default ConditionalFooter;
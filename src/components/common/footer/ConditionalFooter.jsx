import React from 'react';
import { useLocation } from 'react-router-dom'; // <-- 追加
import FooterPK from './FooterPK';
import FriendsFooter from './FriendsFooter';
import { useAdminFlag } from '../../../context/AdminFlagContext'

const ConditionalFooter = () => {
    const { adminFlag, isLoading } = useAdminFlag(); // <-- useAdminFlagで取得
    const location = useLocation();

    // Debugging lines
  console.log('adminFlag:', adminFlag);
  console.log('isLoading:', isLoading);
  
    // ログインページではフッターを表示しない
    if (location.pathname === '/login') {
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
        {typeof adminFlag !== 'number' && <div>Admin flag is not a number: {String(adminFlag)}</div>}
      </div>
    );
  };
  
  export default ConditionalFooter;
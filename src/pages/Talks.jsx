import React, { useEffect, useState } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from '../pages/Firebase';
import MemberList from '../components/talk/mamberlist/MemberList'
import TopNavbar from '../components/common/header/TopNavbar'
import FooterPK from '../components/common/footer/FooterPK'
import MenuComponent from '../components/talk/menu/MenuComponent';
import FriendsMemberList from '../components/talk/mamberlist/FriendsMemberList'
import FriendsMenu from '../components/talk/menu/FriendsMenu';

const Talks = () => {
  const [adminFlag, setAdminFlag] = useState(null);

  useEffect(() => {
    const fetchAdminFlag = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setAdminFlag(userDoc.data().adminFlag);
        console.log("Current user's adminFlag:", userDoc.data().adminFlag);  // ここでログを出力
      }
    };

    fetchAdminFlag();
  }, []);

  return (
    <div>
      {/* <TopNavbar /> */}
      {(adminFlag === 0 || adminFlag === 1) && (
        <>
          <MenuComponent />
          <MemberList />
        </>
      )}
      {adminFlag === 3 && (
        <>
          <FriendsMenu />
          <FriendsMemberList />
        </>
      )}
      {/* <FooterPK /> */}
    </div>
  );
};

export default Talks;

    


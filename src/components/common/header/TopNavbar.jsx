import React, { useEffect, useState, useRef, useContext  } from 'react';
import './Navbar.css';
import {MoreHoriz, Flower, Home, Calendar, Settings, ChatLines, AddUser ,LogOut ,List, Group} from 'iconoir-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../pages/Firebase';  // Firebaseの設定に応じて変更
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ColorContext } from '../../../App';
import { useAdminFlag } from '../../../context/AdminFlagContext'

const convertRGBtoRGBA = (rgbString, opacity) => {
  return rgbString.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { bgColor } = useContext(ColorContext);  
  const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得
  const location = useLocation();  // <-- 追加
  const menuRef = useRef(null);  // メニューの参照

  useEffect(() => {
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);  // URLが変更されるとメニューを閉じる
  }, [location]);  // <-- 追加

  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        menuRef.current.style.transform = "translateX(0%)";
      } else {
        menuRef.current.style.transform = "translateX(100%)";
      }
    }
  }, [menuOpen]);


  const handleSignOut = () => {
    signOut(auth).then(() => {
      // console.log('User signed out');
      navigate('/');  // ここでリダイレクト
    });
  };

  const menuItems = [
    { name: "メインページ", action: "/dashboard" , icon:<Home fontSize={16} strokeWidth={1} />},
    { name: "クリック履歴", action: "/clicks" , icon:<List fontSize={16} strokeWidth={1} />},
    { name: "トーク", action: "/talks" , icon:<ChatLines fontSize={16} strokeWidth={1} />},
    { name: "カレンダー", action: "/calendar", icon:<Calendar fontSize={16} strokeWidth={1} /> },
    { name: "設定", action: "/settings" , icon:<Settings fontSize={16} strokeWidth={1} />},
    { name: "お知らせ", action: "/notification", icon:<Flower fontSize={16} strokeWidth={1} /> },
    { name: "ログアウト", action: "LOG_OUT", icon:<LogOut fontSize={16} strokeWidth={1} /> }
  ];

  // "お知らせ" の次にアイテムを追加するため、インデックス 6（0から始まる）に追加
  if (adminFlag === 0 || adminFlag === 1) {
    menuItems.splice(6, 0, { name: "友達招待", action: "/AddMember" , icon:<AddUser fontSize={16} strokeWidth={1} />});
  } else if (adminFlag === 3) {
    menuItems.splice(6, 0, { name: "メンバーリスト", action: "/Member", icon:<Group fontSize={16} strokeWidth={1} /> });
  }

  const styles = {
    navbarFixed: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: convertRGBtoRGBA(bgColor, 0.8),
    }
  };

  return (
    <div className="navbar" style={styles.navbarFixed}>
      <div className="left-item">
        <Link to="/notification" className="navbar-item"><Flower fontSize={16} strokeWidth={1} /></Link>
      </div>
      
      <div className="center-item">
        <h1 className="navbar-item" style={{ fontWeight: "bold" }}>omoi flowers</h1>
      </div>

      <div className="right-item">
      <div className="navbar-item" onClick={() => {
          setMenuOpen((prevState => !prevState));
          // console.log("menuOpen:", menuOpen);  // <-- この行を追加
        }}>
          <MoreHoriz fontSize={16}  strokeWidth={2} />
        </div>
      </div>
      <div className={menuOpen ? 'menu-open' : ''}>
      {menuOpen && (
        <div className="dropdown-menu" ref={menuRef} >
          {menuItems.map((item, index) => {
            if (item.action === "LOG_OUT") {
              return (
                <a 
                  key={index}
                  href="#" 
                  className="dropdown-item" 
                  onClick={handleSignOut}
                >
                  {item.icon}
                  {item.name}
                </a>
              );
            } else {
              return (
                <Link 
                  key={index} 
                  to={item.action} 
                  className="dropdown-item"
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
    </div>
  );
}


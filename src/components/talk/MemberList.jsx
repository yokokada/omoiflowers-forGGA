// 登録しているメンバーの一覧を表示するコンポーネント
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../pages/Firebase';

const MemberList = () => {

    const tailId = 'YOUR_TAIL_DOCUMENT_ID'; // 適切なIDに置き換えてください

    // Firestoreから指定したtailドキュメントの中のmembersサブコレクションのデータを取得
    const [members, loading, error] = useCollectionData(db.collection('tails').doc(tailId).collection('members'));
  
    // データのロード中の表示
    if (loading) {
      return <p>Loading...</p>;
    }
  
    // エラーが発生した場合の表示
    if (error) {
      console.error("Error fetching members:", error);
      return <p>Failed to load members.</p>;
    }
  
    return (
      <div>
        <h2>Members List</h2>
        <ul>
          {members.map(member => (
            <li key={member.id}>
              {member.name} ({member.email})
            </li>
          ))}
        </ul>
      </div>
    )
  }

export default MemberList;
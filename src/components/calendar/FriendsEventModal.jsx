import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import './EventModal.css';  // CSSファイル名は適宜変更してください
import { db, auth } from '../../pages/Firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';

const FriendsEventModal = ({ isOpen, onClose, onSave }) => {
    const [okTime, setOkTime] = useState("");
    const [requestTime, setRequestTime] = useState("");
    const [comments, setComments] = useState({});

    const fetchDataFromFirestore = async () => {
        const q = query(collection(db, "friendEvents"), where("userId", "==", auth.currentUser?.uid || ''));
        const querySnapshot = await getDocs(q);
        let data = {};
        querySnapshot.forEach((doc) => {
            data = doc.data();
        });
        return data;
    };

    useEffect(() => {
        if (isOpen) {
            fetchDataFromFirestore().then(data => {
                setOkTime(data['okTime'] || '');
                setComments(data['comments'] || '');
            });
        }
    }, [isOpen]);

    const saveToFirebase = async () => {
        const data = {
            timestamp: serverTimestamp(),
            userId: auth.currentUser?.uid || '',
            requestTime: requestTime,
            comments: comments,
        };

        try {
            await addDoc(collection(db, "friendRequests"), data);
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    const handleSave = () => {
        saveToFirebase();
        if (onSave) {
            onSave();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className='friendsEventModal'>
            <button className="close-button" onClick={onClose}>×</button>
            <h3>お見舞いリクエスト</h3>
            <p>お見舞いOK時間: {okTime}</p>
            <input type="time" value={requestTime} onChange={(e) => setRequestTime(e.target.value)} />
            <input
                type="text"
                placeholder="コメントを追加"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="comment-input"
            />
            <Button style={{ backgroundColor: '#1B3672', color: 'white' }} onClick={handleSave}>リクエスト</Button>
        </div>
    );
};

export default FriendsEventModal;

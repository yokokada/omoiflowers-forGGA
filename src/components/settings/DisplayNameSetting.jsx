import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../pages/Firebase';

const DisplayNameSetting = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    let email = "";
    let displayName = "";

    if (user !== null) {
        email = user.email;
        displayName = user.displayName;
    }

    return (
        <div>
            <p>Email: {email}</p>
            <p>DisplayName: {displayName}</p>
        </div>
    );
};

export default DisplayNameSetting;

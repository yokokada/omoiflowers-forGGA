import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundComponent() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>お探しのページは見つかりませんでした。</p>
            <Link to="/">ホームページに戻る</Link>
        </div>
    );
}

export default NotFoundComponent;

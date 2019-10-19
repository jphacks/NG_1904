import React from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const history = useHistory();

    return (
        <body className="App-body">
            <a>HomePage</a>
            <button onClick={()=>history.push('/result')}>ToResult</button>
        </body>
    );
}
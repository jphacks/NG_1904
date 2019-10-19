import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div className="App">
            <body className="App-body">
                <a>HomePage</a>
                <Link to="/record">
                    <button>ToRecord</button>
                </Link>
            </body>
        </div>
    );
}
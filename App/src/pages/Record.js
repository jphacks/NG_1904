import React from 'react';
import './Record.css';
import { Link } from 'react-router-dom';

export default function Record() {

    return (
        <div className="App">
            <body className="App-body">
                <a>RecordPage</a>
                <Link to="/home">
                    <button>ToHome</button>
                </Link>
            </body>
        </div>
    );
}
import React from 'react';
import './Result.css';
import { Link } from 'react-router-dom';
import testData from './test.json';

export default function Result() {
    
    return (
        <div className="App">
            <header>
                <h1>ResultPage</h1>
            </header>
            <body className="App-body">
                <a>FirstContent</a>
                <Link to="/Home">
                    <button>Set</button>
                </Link>
            </body>
        </div>
    );
}
import React from 'react';
import './Result.css';
import { Link } from 'react-router-dom';
import testData from './test.json';

export default function Result() {

    const listItems = testData.map((data, index) =>
        <Link to="/Home">
            <li key={index} className="List-item">
                {data.str}{" ： "}{data.count}
                <button >LOG</button>
            </li>
        </Link>
    );

    return (
        <>
            <header>
                    <h1>ResultPage</h1>
            </header>
            <div>
                <div>
                    <ol className="List">{listItems}</ol>
                </div>
            </div>
        </>
    );
}
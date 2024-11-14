import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'
export default function Header() {
    return (
        <nav>
            <div className='headingContainer'><h1 className='Heading'>Recipe Share</h1></div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add">Add Recipe</Link>
                </li>
            </ul>
        </nav>
    )
}

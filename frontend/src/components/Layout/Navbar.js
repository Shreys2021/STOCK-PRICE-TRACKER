import React, { useState } from 'react';
import './Navbar.css';
import LoginButton from '../user/Login';
import LogoutButton from '../user/Logout';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

    const { user, isAuthenticated } = useAuth0();


    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><a href="/">Home</a></li>

                <li className="nav-item"><a href="/subscribed-stocks">My Stocks</a></li>
                {isAuthenticated ? (
                    <li className="nav-item">
                        <LogoutButton />
                    </li>
                ) : (
                    <li className="nav-item">
                        <LoginButton />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

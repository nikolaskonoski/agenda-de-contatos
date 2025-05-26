import React from 'react';
import ReactDom from 'react-dom';
import './Header.css';
import logo from '../assets/logo-rivool.png';

function Header() {
    return (
        <header className="app-header">
            <img src={logo} className="app-logo" alt="Logotipo empresarial" />
        </header>
    );
}

export default Header;
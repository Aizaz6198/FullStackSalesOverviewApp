import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <a href="#" className="navbar-brand">RapidQuest</a>
            <button className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><a href="#sales-chart">Sales Chart</a></li>
                <li><a href="#growth-sales-chart">Growth Sales</a></li>
                <li><a href="#new-customers-chart">New Customers</a></li>
                <li><a href="#repeat-customers-chart">Repeat Customers</a></li>
                <li><a href="#geographical-distribution">Geographical Distribution</a></li>
                <li><a href="#customer-lifetime-cohorts">Customer Lifetime Cohorts</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;

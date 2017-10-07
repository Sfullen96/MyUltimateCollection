import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ( props ) => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <Link to="/" className="navbar-brand"> LOGO </Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/account-overview">Overview</Link>
                    </li>
                    <li>
                        <Link to="/jobs/post">Post a Job</Link>
                    </li>
                    <li>
                        <Link to="/activity">My Activity</Link>
                    </li>
                    <li>
                        <Link to="/account">My Account</Link>
                    </li>
                    {
                        props.isLoggedIn ?
                            <li className="navbar-list-item">
                                <Link to="/login">Logout</Link>
                            </li>
                            :
                            <li className="navbar-list-item">
                                <Link to="/login">Login</Link>
                            </li>
                    }
                </ul>
            </div>
        </div>
    </nav>

);
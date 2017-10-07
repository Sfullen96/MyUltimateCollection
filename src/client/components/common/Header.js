import React from 'react';

const Header = ( props ) => (
    <header>
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header"><button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a className="navbar-brand text-hide" href="/">Logo</a></div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-search" /></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className="removeMargin">
                                    <form className="navbar-form navbar-left">
                                        <div className="form-group">
                                            <div>
                                                <div><input type="text" name="keyword" value="" className="form-control" placeholder="Keyword Search..." /></div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-default btn-block submitBtn">Submit</button>
                                    </form>
                                </li>
                            </ul>
                        </li>
                        <li><a>Logout</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown">Sales</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/sales/8/segments/my-leads">Leads</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown">Jobs</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/jobs/6/segments/recent-jobs">Jobs</a></li>
                                <li><a href="/static-header">Reports</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown">Customer Care</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/customer-care/1">Home</a></li>
                                <li><a href="/customer-care/1/forums">Forums</a></li>
                                <li><a href="/customer-care/1/reports">Reports</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown">Sponsorship</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/sponsorship/9/segments/sponsorship-campaigns"> Campaigns </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;
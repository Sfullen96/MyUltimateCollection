import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchActions } from '../../actions';

class Header extends Component {

    goToResults( event ) {
        event.preventDefault();
        // this.context.history.push( '/search' );
        return <Redirect to="/home" />
    }

    render() {

        const { searchTerm, match, location, history } = this.props;

        console.log( "PROPS", this.props );

        return(
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                    </button>
                                </div>
                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <form className="navbar-form navbar-left" method="POST" action="" onSubmit={ this.props.handleSearchTermChange }>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control margin-bottom"
                                                        name="keyword"
                                                        required
                                                        placeholder="Search..."
                                                        value={ searchTerm }
                                                        onChange={ this.props.handleSearchTermChange }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-3">
                                            </div>
                                        </div>
                                    </form>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className=""><Link to="/">Home</Link></li>

                                        <li className=""><Link to="/add-cd">Add to Library</Link></li>
                                        <li className=""><Link to="/library">View Library</Link></li>
                                        <li className=""><Link to="/login">Login</Link></li>
                                        <li className="dropdown">
                                            <Link
                                                to=""
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"> Account <span className="caret"/>
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li><Link to="/manage-account">Manage Account</Link></li>
                                                <li><Link to="/logout"> Logout </Link></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Admin <span className="caret"/></Link>
                                            <ul className="dropdown-menu">
                                                <li><Link to="/admin/view-accounts"> View Accounts </Link></li>
                                                <li><Link to="/admin/manage-library"> Manage Library </Link></li>
                                                <li><Link to="/admin/manage-artists"> Manage Artists </Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    searchTerm: state.searchTerm,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    handleSearchTermChange: () => dispatch( searchActions.handleSearchTermChange() )
} );
//
// const ShowTheLocationWithRouter = withRouter( Header );
// withRouter( connect(...)( MyComponent ) )


export default connect( mapStateToProps, mapDispatchToProps )( Header );
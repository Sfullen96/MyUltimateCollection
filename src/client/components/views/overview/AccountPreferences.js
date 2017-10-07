import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountPreferences extends Component {
    componentDidMount() {};

    render = () => {
        // const {  } = this.props;
        return (
            <div>
                Account Preferences
            </div>
        );
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect( mapStateToProps, mapDispatchToProps )( AccountPreferences );
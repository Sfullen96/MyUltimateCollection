import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home Component</h3>
            </div>
        );
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect( mapStateToProps, mapDispatchToProps )( Home );
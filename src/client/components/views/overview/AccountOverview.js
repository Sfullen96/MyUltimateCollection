import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Control, Sidebar } from '../../common/elements';
import { ControlSidebarContentLayout } from '../../layouts';

class Overview extends Component {

    renderControl = ( props ) => (
       <Control>
            <button>One</button>
            <button>Two</button>
            <button>Three</button>
        </Control>
    );

    renderSidebar = ( props ) => (
        <Sidebar>
            <Link to={ `/test` }>Link One</Link>
            <Link to={ `/test` }>Link Two</Link>
            <Link to={ `/test` }>Link Three</Link>
        </Sidebar>
    );

    render() {
        // const { match } = this.props;

        return (
            <ControlSidebarContentLayout control={ this.renderControl() } sidebar={ this.renderSidebar() }>
                <div>
                    <h2>OVERVIEW</h2>
                </div>
            </ControlSidebarContentLayout>
        );
    };
}

export default Overview;

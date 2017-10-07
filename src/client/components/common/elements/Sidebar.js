import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        const children = this.props.children.length ? this.props.children : [ this.props.children ];
        return (
            <aside>
                <ul>
                    { children.map( ( child, index ) => {
                        return ( <li key={ index }>{ child }</li> );
                    } ) }
                </ul>
            </aside>
        );
    };
}

export default Sidebar;

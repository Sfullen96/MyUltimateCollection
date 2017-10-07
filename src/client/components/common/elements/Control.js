import React, { Component } from 'react';

class Control extends Component {
    render() {
        let children = []; // eslint-disable-line no-useless-rename
        if ( this.props.children ) {
            children = this.props.children instanceof Array ? this.props.children : [ this.props.children ];
        }

        return (
            <section className="page-controls row">
                <div className="col-md-4">
                    <h1>{ this.props.title }</h1>
                    <h4>{ this.props.description }</h4>
                </div>
                <div className="col-md-8">
                    <ul className="page-control-buttons">
                        { children.map( ( button, index ) => { // eslint-disable-line array-callback-return
                            if ( button ) {
                                return( <li key={ index }>{ button }</li> );
                            }
                        } ) }
                    </ul>
                </div>
            </section>
        );
    };
}

export default Control;
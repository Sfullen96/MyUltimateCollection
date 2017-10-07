import React, { Component } from 'react';

class ControlSidebarContent extends Component {
    render() {
        const { children, control, sidebar } = this.props;
        return (
            <div className="container-fluid">
                { control }
                <div className="row page-content">
                    { sidebar && <div className="col-sm-3">
                        { sidebar }
                    </div>}
                    <div className={ sidebar ? 'col-sm-9' : 'col-sm-12'}>
                        { children }
                    </div>
                </div>
            </div>
        );
    };
}

export default ControlSidebarContent;

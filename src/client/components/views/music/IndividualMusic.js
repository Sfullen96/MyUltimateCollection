import React, { Component } from "react";
import { connect } from "react-redux";

class IndividualMusic extends Component {
    componentDidMount() {
        const { match } = this.props;

        const musicId = match.params.musicId;


    }

    render() {
        return(
            <div>
                <h1>HERE</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ( {

} );

const mapDispatchToProps = ( dispatch ) => ( {

} );

export default connect( mapStateToProps, mapDispatchToProps )( IndividualMusic );


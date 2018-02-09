import React, { Component } from "react";
import { connect } from "react-redux";
import { accountActions } from "../../../actions";
import { HomepageMusicItem } from "./";

class HomepageMusic extends Component {
    componentDidMount() {
        const { getAccountMusic } = this.props;

        getAccountMusic( 1 );
    }

    render() {
        const { music } = this.props;

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        return (
            <div className="row">
                { music
                    .map( ( item, key ) => {
                        return (
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2 homepage-item-container" key={ key } >
                                <HomepageMusicItem music={ item } key={ key } />
                            </div>
                        )
                    } )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    musicFetch: state.account.musicFetch,
    musicFetchError: state.account.musicFetchError,
    music: state.account.music,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId ) => dispatch( accountActions.getAccountMusic( accountId ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( HomepageMusic );
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const TrackTable = ( props ) => {
    return(
        <table className="table table-striped">
            <thead>
            <tr>
                <td>#</td>
                <td>Name</td>
                <td>Duration</td>
            </tr>
            </thead>
            <tbody>
            {
                props
                    .tracks
                    .map( ( track, key ) => {
                        const formattedDuration = moment.utc( track.duration * 1000 ).format( "m:ss" );
                        return (
                            <tr key={ key }>
                                <td>{ track.order }</td>
                                <td><Link to={ track.last_fm_url } target="_blank" >{ track.name }</Link></td>
                                <td>{ formattedDuration }</td>
                            </tr>
                        );
                    } )
            }
            </tbody>
        </table>
    );
};

export default TrackTable;
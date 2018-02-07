import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use( morgan( ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

console.log( '*************** before app.use*********************' )

// { maxAge: 31536000}
if ( process.env.NODE_ENV === "production" ) {
    app.use(express.static(path.resolve(__dirname, '../..', 'dist', "client") ) );

    app.get( "*", ( req, res ) => {
        console.log( "**************in app.get*************************", req.headers, res.headers )
        // res
        //     .set( {
        //         'Cache-Control': 'public',
        //         'max-age': 31536000,
        //     } )
            res.sendFile( path.resolve( __dirname, "../..", "dist", "client", "index.html" ) );
    } );
}

export default app;

// res.set( {
//     'Cache-Control': 'public',
//     'max-age': 31536000,
// } )

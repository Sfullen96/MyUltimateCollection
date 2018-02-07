"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _morgan2.default)(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

console.log('*************** before app.use*********************');

// { maxAge: 31536000}
if (process.env.NODE_ENV === "production") {
    app.use(_express2.default.static(_path2.default.resolve(__dirname, '../..', 'dist', "client")));

    app.get("*", function (req, res) {
        console.log("**************in app.get*************************", req.headers, res.headers);
        // res
        //     .set( {
        //         'Cache-Control': 'public',
        //         'max-age': 31536000,
        //     } )
        res.sendFile(_path2.default.resolve(__dirname, "../..", "dist", "client", "index.html"));
    });
}

exports.default = app;

// res.set( {
//     'Cache-Control': 'public',
//     'max-age': 31536000,
// } )
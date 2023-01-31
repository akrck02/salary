require('dotenv').config();
const liveServer = require("live-server");
 

console.log(process.env.PORT);
console.log(process.env.IP);

const params = {
    port: process.env.PORT, 
    host: process.env.IP,
    root: ".",
    open: false,
    wait: 1000, 
    logLevel: 2, 
    middleware: [function(req, res, next) { next(); }]
};
liveServer.start(params);

const fs =require('fs');

fs.writeFileSync("./test.txt", "Hello, World!");

fs.appendFileSync("./test.txt", " Welcome to Node.js!");

const os = require('os');

console.log("Operating System:", os.cpus().length);
console.log("CPU Architecture:", os.arch());
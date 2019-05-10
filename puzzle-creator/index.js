const fs = require("fs");

var indexTable = 'aec5yj18on20';
var encDecoder = require('base-x')(indexTable)

var plainText = "Congratulations!  You figured out this puzzle.  Unzip the encrypted zip file (reward.zip) using the indexTable as the password"
 
var encoded = encDecoder.encode(Buffer.from(plainText));
console.log(encoded)
fs.writeFile("../puzzle-public/encoded.txt", encoded, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
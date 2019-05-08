var indexTable = 'aec5yj18on20';
var encDecoder = require('base-x')(indexTable)

var plainText = "Congratulations!  You figured out this puzzle.  Unzip the encoded zip file using the indexTable as the salt"
 
 
console.log(encDecoder.encode(Buffer.from(plainText)))

var indexTable = 'aec5yj18on20';
var encDecoder = require('base-x')(indexTable)

var plainText = "Congratulations!  You figured out this puzzle.  Unzip the encoded zip file using the indexTable as the salt"
 
 
//console.log(encDecoder.encode(Buffer.from(plainText)))


indexTable = '0aec5yj18on2';
var encDecoder = require('base-x')(indexTable)

var encoded = 'enoyeoya55eanyeay1on02j5ac5j0nyjo02ce582ynay522j510y8e1cejacjn5eajaaj028j0jyyyjcee5eej1ca8o1ey0oeoc1yy5yooo01oan802ayya0o500njnoo1j1oacnc0y1jc11c8810aa202ann2ee1181oa1aceo118108oc5caeo8058c02jnj88ya2o182no8aejje2acc0a25coo1anacnojcej88c8ay'

console.log(encDecoder.decode(encoded).toString());

const fs = require("fs");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const moment = require('moment');

const myFormat = printf(({ level, message, label, timestamp }) => {
  var myTimestamp = moment().format('YYYY-MM-DD hh:mm:ss').trim();
  return `${myTimestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});


// printable ascii
// https://stackoverflow.com/questions/14313183/javascript-regex-how-do-i-check-if-the-string-is-ascii-only?lq=1
function isASCII(str) {
    return /^[\x20-\x7F]*$/.test(str);
}

// http://staff.roguecc.edu/JMiller/JavaScript/permute.html
//permArr: Global array which holds the list of permutations
//usedChars: Global utility array which holds a list of "currently-in-use" characters
var usedChars = [];
var perm = "";
var encodedStr = ""; // just a sample of the orig
var permutationCount = 0;
function permute(input) {
    //convert input into a char array (one element for each character)
    var i, ch, chars = input.split("");
    for (i = 0; i < chars.length; i++) {
        //get and remove character at index "i" from char array
        ch = chars.splice(i, 1);
        //add removed character to the end of used characters
        usedChars.push(ch);
        //when there are no more characters left in char array to add, add used chars to list of permutations
        if (chars.length == 0) {
            permutationCount++;

            perm = usedChars.join("");
            //perm = expandPermutation(perm);
            var baseX = require('base-x')(perm)
            var decoded = baseX.decode(encodedStr);
            decoded = decoded.toString();
            if (permutationCount % 10000000 == 0) {
                logger.info(`permutationCount : ${permutationCount} with last permuation as : ${perm}`)
            }
            if (isASCII(decoded)) {
                logger.info("FOUND SOLN!")
                logger.info(`indexTable : ${perm}`)
                logger.info(decoded)
                process.exit();
            }
        }
        //send characters (minus the removed one from above) from char array to be permuted
        permute(chars.join(""));
        //add removed character back into char array in original position
        chars.splice(i, 0, ch);
        //remove the last character used off the end of used characters array
        usedChars.pop();
    }
}

function getUniqueChars(str) {
    var alphabetSet = new Set();
    for (var i = 0; i < str.length; i++) {
        alphabetSet.add(str.charAt(i))
    }
    return [...alphabetSet].join('')
}

fs.readFile("../puzzle-public/encoded.txt", "utf8", function (err, data) {
    encodedStr = data.toString();
    encodedStr = encodedStr.replace("\n", "")
    logger.info("BEGIN!")
    logger.info("encodedStr: " + encodedStr)
    var alphabet = getUniqueChars(encodedStr)
    logger.info(`uniqueChars found in encodedStr : ${alphabet} ... length is ${alphabet.length}`)
    // note 12! == 479001600 takes about 1.5h to run
    // A Base12 packs 3.585bits per char ( Math.log(12) / Math.log(2) )
    permute(alphabet);
    logger.error("No soln found =( " + new Date())
});

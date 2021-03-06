# Encoding Fun

Solve the puzzle [here](encoded.txt) and you'll get a reward

## Hints:
* The puzzle is a ciphertext encoded in Base-N (where N is a number between 10 and 64)
* Figure out how many (and which) unique charcters (symbols) are in the ciphertext
* You'll have to use brute force to find the order of the symbols in the `alphabet` (aka `index table`)
* The plainText (decoded ciphertext) is in ASCII

## Fun facts:
* a base64 alphabet packs 6 bits per character
* a base58 alphabet packs roughly 5.858 bits per character
* a base32 alphabet packs 5 bits per character
* the number of permutations in an alphabet (size N) is N! 

'''
baseN code borrowed from
https://github.com/keis/base58/
'''

# This module is based upon base58 snippets found scattered over many bitcoin
# tools written in python. From what I gather the original source is from a
# forum post by Gavin Andresen, so direct your praise to him.
# This module adds shiny packaging and support for python3.

from hashlib import sha256


class BaseNEncDecoder:
    def __init__(self, alphabet): 
        self.alphabet = alphabet
        self.baseN = len(alphabet)

    if bytes == str:  # python2
        iseq, bseq, buffer = (
            lambda self, s: map(ord, s),
            lambda self, s: ''.join(map(chr, s)),
            lambda self, s: s,
        )
    else:  # python3
        iseq, bseq, buffer = (
            lambda self, s: s,
            bytes,
            lambda self, s: s.buffer,
        )


    def scrub_input(self, v):
        if isinstance(v, str) and not isinstance(v, bytes):
            v = v.encode('ascii')
        return v


    def encode_int(self, i, default_one=True):
        if not i and default_one:
            return self.alphabet[0:1]
        string = b""
        while i:
            i, idx = divmod(i, self.baseN)
            string = self.alphabet[idx:idx+1] + string
        return string


    def encode(self, v):
        v = self.scrub_input(v)

        nPad = len(v)
        v = v.lstrip(b'\0')
        nPad -= len(v)

        p, acc = 1, 0
        for c in self.iseq(reversed(v)):
            acc += p * c
            p = p << 8

        result = self.encode_int(acc, default_one=False)

        return (self.alphabet[0:1] * nPad + result)


    def decode_int(self, v):
        v = v.rstrip()
        v = self.scrub_input(v)

        decimal = 0
        for char in v:
            decimal = decimal * self.baseN + self.alphabet.index(char)
        return decimal


    def decode(self, v):
        v = v.rstrip()
        v = self.scrub_input(v)

        origlen = len(v)
        v = v.lstrip(self.alphabet[0:1])
        newlen = len(v)

        acc = self.decode_int(v)

        result = []
        while acc > 0:
            acc, mod = divmod(acc, 256)
            result.append(mod)

        return (b'\0' * (origlen - newlen) + self.bseq(reversed(result)))


    def encode_check(self, v):
        digest = sha256(sha256(v).digest()).digest()
        return self.encode(v + digest[:4])


    def decode_check(self, v):
        result = self.decode(v)
        result, check = result[:-4], result[-4:]
        digest = sha256(sha256(result).digest()).digest()

        if check != digest[:4]:
            raise ValueError("Invalid checksum")

        return result


export default function cipherXOR(input, key, alphabet, mode) {
  const modif = mode === 'Encrypt' ? 1 : -1;

  console.log('In XOR, alphabet is not needed.');

  key = generateGamma(input);

  // for (let i = 0; i < input.length; i++) {
  //   currCharIndex = alphabet.indexOf(input[i]);

  //   // Character is found in the alphabet
  //   if (currCharIndex >= 0) {
  //     currCharIndex = (currCharIndex + shift * modif) % length;
  //     // Special check for negative, out of bounds index (due to %)
  //     if (currCharIndex < 0) currCharIndex += length;

  //     output += alphabet.join('').charAt(currCharIndex);
  //   } else {
  //     output += input[i]; // Leave it as it is
  //   }
  // }

  /* Encryption
   * Ci = (Ti + Gi) % N, where
   * N = length; C, G, T are texts;
   * Ci - encrypted[i], Ti - text[i], Gi - gamma[i];
   * !!! if (Ci == 0) Ci = N
   */

  /* Decryption
   * Ti = (Ci - Gi + N) % N, where
   * !!! if (Ti == 0) Ti = N
   */

  return input;
}

const generateGamma = (input, alphabet) => {
  // const generated = [];
  // for (let i = 0; i < input.length; i++) {
  //   generated.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
  // }
  // return generated.join('');

  // dec2hex :: Integer -> String
  // i.e. 0-255 -> '00'-'ff'
  function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  // generateId :: Integer -> String
  function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  console.log(generateId());
  // "82defcf324571e70b0521d79cce2bf3fffccd69"

  console.log(generateId(20));
  // "c1a050a4cd1556948d41"
};

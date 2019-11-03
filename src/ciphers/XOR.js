/*
 * input -- string, input message
 * key -- string, generated gamma key
 * alphabet -- array [set] of strings
 * mode -- string 'Encrypt' or 'Decrypt'
 */
export default function cipherXOR(input, key, alphabet, mode) {
  const alength = alphabet.length;
  const modif = mode === 'Encrypt' ? 1 : -1;

  // Debug
  // console.log(`>> LEN of INPUT: ${input.length}`);
  // console.log(`>> LEN of KEY  : ${key.length}`);

  let output = '';
  let currCharIndex = 0;
  let res = 0;
  let shift = 0;
  let currChar = 0;

  /* Encryption
   * Ci = (Ti + Gi) % N, where
   * * N = length; C, G, T are texts;
   * * Ci - encrypted[i], Ti - text[i], Gi - gamma[i];
   * * !!! if (Ci == 0) Ci = N
   */

  /* Decryption
   * Ti = (Ci - Gi + N) % N, where
   * * !!! if (Ti == 0) Ti = N
   */

  for (let i = 0; i < input.length; i++) {
    // Current char position from alphabet
    currCharIndex = alphabet.indexOf(input[i]);

    // Character is found in the alphabet
    if (currCharIndex >= 0) {
      shift = alphabet.indexOf(key[i % key.length]);
      if (shift < 0) shift = alength + (shift % alength);

      // Encrypted char position from alphabet
      res = (alength + currCharIndex + ((shift * modif) % alength)) % alength;
      // Char on position 'res' in alphabet
      currChar = alphabet[res];

      output += currChar;

      // Debug output
      console.log(`'${input[i]}' -- ${currCharIndex} -- ${shift} -- ${res} -- '${currChar}'`);
    } else {
      output += input[i]; // Leave it as it is
    }
  }

  return output;
}

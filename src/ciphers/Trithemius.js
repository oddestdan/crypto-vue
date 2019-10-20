export default function cipherCaesar(input, key, alphabet, mode) {
  const length = alphabet.length;
  const modif = mode === 'Encrypt' ? 1 : -1;

  console.log(`Function: '${key}'`);

  // Some key function, returns Integer
  const sOFp = p => 2 * p + 3;

  let output = '';
  let currCharIndex = 0;
  let shift = 0;
  let res = 0;
  let currChar = 0;

  // C = (m + s(p)) % N
  // res = (currCharIndex + sOFp(i)) % length

  for (let i = 0; i < input.length; i++) {
    // Current char position from alphabet
    currCharIndex = alphabet.indexOf(input[i]);

    // Character is found in the alphabet
    if (currCharIndex >= 0) {
      // Integer from some key-function
      shift = sOFp(i);
      if (shift < 0) shift = length + (shift % length);
      // Encrypted char position from alphabet
      res = (currCharIndex + shift * modif) % length;
      // Char on position 'res' in alphabet
      currChar = alphabet.join('').charAt(res);

      console.log(`${currCharIndex} -- ${shift} -- ${res} -- ${currChar}`);
    } else {
      output += input[i]; // Leave it as it is
    }

    output += currChar;
  }
  return output;
}

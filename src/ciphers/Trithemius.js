export default function cipherCaesar(input, key, alphabet, mode) {
  const length = alphabet.length;
  const modif = mode === 'Encrypt' ? 1 : -1;
  const isVigenere = typeof key === 'object' ? false : true;

  let keyFunction;

  // Parsing coefficients
  if (!isVigenere) key = key.map(el => Number(el));
  keyFunction = p => (accum, el, i) => accum + el * p ** i;

  // Map key coefficients from String to Number
  // Some key function, returns Integer
  // let keyFunction = p => {
  //   let res = 0;
  //   for (let i = 0; i < key.length; i++) {
  //     res += key[i] * p ** i;
  //     console.log(`current res is ${res}`);
  //   }
  //   return res;
  // };

  // const pReducer = getReducer(p);
  // key.reduce(pReducer, 0);

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
      if (isVigenere) {
        shift = alphabet.indexOf(key[i] & key.length);
      } else {
        // Integer from some key-function
        shift = key.reduce(keyFunction(i), 0);
      }

      if (shift < 0) shift = length + (shift % length);

      // Encrypted char position from alphabet
      res = (length + currCharIndex + ((shift * modif) % length)) % length;
      // Char on position 'res' in alphabet
      currChar = alphabet.join('').charAt(res);

      output += currChar;

      console.log(`'${input[i]}' -- ${currCharIndex} -- ${shift} -- ${res} -- '${currChar}'`);
    } else {
      output += input[i]; // Leave it as it is
    }
  }
  return output;
}

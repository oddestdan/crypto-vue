export default function cipherCaesar(input, key, language, mode) {
  const length = language.length;
  const modif = mode === 'Encrypt' ? 1 : -1;

  let output = '';
  let currCharIndex = 0;
  let shift = Number.parseInt(key);

  if (shift < 0) shift = length + (shift % length);

  // TODO: (?) change to reducer
  for (let i = 0; i < input.length; i++) {
    currCharIndex = language.indexOf(input[i]);

    // Some symbol not found in the language
    if (currCharIndex < 0) {
      output += input[i]; // Leave it as it is
    } else {
      currCharIndex = (currCharIndex + shift * modif) % length;
      // Special check for negative, out of bounds index (due to % modulo)
      if (currCharIndex < 0) currCharIndex += length;

      output += language.join('').charAt(currCharIndex);
    }
  }
  return output;
}

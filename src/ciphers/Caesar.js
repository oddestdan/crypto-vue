export default function cipherCaesar(input, key, alphabet, mode) {
  const length = alphabet.length;
  const modif = mode === 'Encrypt' ? 1 : -1;

  let output = '';
  let currCharIndex = 0;
  let shift = Number.parseInt(key);

  if (shift < 0) shift = length + (shift % length);

  for (let i = 0; i < input.length; i++) {
    currCharIndex = alphabet.indexOf(input[i]);

    // Character is found in the alphabet
    if (currCharIndex >= 0) {
      currCharIndex = (currCharIndex + shift * modif) % length;
      // Special check for negative, out of bounds index (due to %)
      if (currCharIndex < 0) currCharIndex += length;

      output += alphabet.join('').charAt(currCharIndex);
    } else {
      output += input[i]; // Leave it as it is
    }
  }
  return output;
}

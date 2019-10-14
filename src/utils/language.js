export default function language() {
  let out = '';

  const specials = [`'`, `"`, `\``, `\\`];
  const isSpecial = char => specials.includes(char);
  const filterSpecial = text =>
    text
      .split('')
      .filter(el => !isSpecial(el))
      .join('');

  // Generating most used symbols and english
  for (let i = 33; i < 127; i++) {
    out += String.fromCharCode(i);
  }
  // Removing special symbols (quotes and \)
  out = filterSpecial(out);

  // Add ukrainian, russian, etc

  return out;
}

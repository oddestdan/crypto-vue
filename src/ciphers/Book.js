/**
 * Алгоритм віршованого шифрування:
 * * 1.	Вибрати вірш для використання в якості ключа шифрування.
 * * 2.	Пронумерувати  всі стовпчики і рядки вибраного ключа шифрування двозначними цифрами: CC SS відповідно.
 * * 3.	Символу M  вхідного повідомлення поставити у відповідність 4-значний код  CС/SS такого ж вибраного випадково символу ключа шифрування. Тут чисельник кожного дробу - номер рядка, а знаменник - номер стовпчика.
 * * 4.	Код CС/SS занести до шифрограми і додати кому.
 * * 5.	Повторити п.п.3-4  для кожного символу повідомлення, що шифрується
 * Алгоритм розшифрування з використанням вірша:
 * * 1.	Для елемента коду CС/SS криптограми визначити  номер стовпчика CС  і рядка SS зашифрованого символу.
 * * 2.	Знайти в ключі шифрування символ, що знаходиться на перетині CС колонки і SS-рядка.
 * * 3.	Записати знайдений символ в якості розшифрованого символу.
 * * 4.	Повторити п.п.1-3 для кожного елементу коду, відокремленого за допомогою ком.
 */

export default function cipherBook(input, poem, dictionary, mode) {
  const isEncrypting = mode === 'Encrypt' ? true : false;

  const func = isEncrypting ? encrypt : decrypt;
  return func(input, dictionary);
}

const encrypt = (input, dict) => {
  const output = [];
  let letterObj;

  for (let char of input) {
    shuffle(dict);

    letterObj = findFromDictionary(dict, x => x.char === char);
    output.push(`${letterObj.row}/${letterObj.col}`);
  }
  return output.join(',');
};

const decrypt = (input, dict) => {
  const output = [];
  let letterObj;
  let encodes = input.split(',');

  let props, row, col;

  for (let code of encodes) {
    props = code.split('/');
    row = +props[0]; // get letterObj's row as number
    col = +props[1]; // get letterObj's col as number

    letterObj = findFromDictionary(dict, x => x.row === row && x.col === col);
    output.push(letterObj.char);
  }
  return output.join('');
};

const findFromDictionary = (dict, predicate) => dict.find(x => predicate(x));

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

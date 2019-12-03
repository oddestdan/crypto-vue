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

  let output = [];
  let letterObj;
  if (isEncrypting) {
    for (let char of input) {
      shuffle(dictionary);
      letterObj = findFromDictionary(x => x.char === char, dictionary);
      // console.dir(letterObj);
      output.push(`${letterObj.row}/${letterObj.col}`);
    }
    output = output.join(',');
  } else {
    let encodes = input.split(',');
    console.dir(encodes);
    for (let code of encodes) {
      let props = code.split('/');
      let row = +props[0]; // get letterObj's row as number
      let col = +props[1]; // get letterObj's col as number
      console.dir({ row, col });
      letterObj = findFromDictionary(x => x.row === row && x.col === col, dictionary);
      output.push(letterObj.char);
    }
    output = output.join('');
  }
  return output;
}

const findFromDictionary = (predicate, dict) => dict.find(x => predicate(x));

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

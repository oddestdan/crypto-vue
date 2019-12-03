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
  console.log(mode === 'Encrypt' ? 'encrypting...' : 'decrypting...');
  console.dir(dictionary);
  // const modif = mode === 'Encrypt' ? 1 : -1;

  let lineByLinePoem = separateOnEnter(poem);
  console.dir(lineByLinePoem);

  let output = [];
  let letter;
  for (let char of input) {
    letter = letterFromDictionary(char, dictionary);
    console.dir(letter);
    output.push(`${letter.row}/${letter.col}`);
  }
  return output.join(',');
}

const letterFromDictionary = (char, dict) => dict.find(x => x.char === char);

const separateOnEnter = poem => {
  return poem.split('\n').map(line => (line + '\n').split(''));
  // .split('\n')
  // .map(line => line + '\n')
  // .map(line => line.split(''));
};

const string1 = prompt('Введите число');
const number1 = parseInt(string1);

if (Number.isNaN(number1)) {
  console.log('Некорректный ввод!');
} else {
  const string2 = prompt('Введите число');
  const number2 = parseInt(string2);
  if (Number.isNaN(number2)) {
    console.log('Некорректный ввод!');
  } else {
    console.log(`Ответ:${number1 + number2}, ${number1 / number2}.`);
  }
}

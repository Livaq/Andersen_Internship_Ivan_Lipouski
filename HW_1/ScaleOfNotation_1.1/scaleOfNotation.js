const baseString = prompt('Введите число');
const radixString = prompt('Введите целое число от 2 до 36 (система счисления)');
const baseNumber = parseInt(baseString);
const radixNumber = parseInt(radixString);

if (Number.isNaN(baseNumber) || Number.isNaN(radixNumber)) {
  console.log('Некорректный ввод!');
} else {
  console.log(baseNumber.toString(radixNumber));
}

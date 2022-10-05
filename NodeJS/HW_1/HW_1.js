// Вызвать любую фукнцию через .delay
Function.prototype.delay = function (ms) {
  setTimeout(() => {
    this.call(null);
  }, ms);
};

function foo() {
  console.log(1);
}

function fun() {
  console.log(2);
}

// foo.delay(3000) // logs 1 after 3 sec
// fun.delay(1000) // logs 2 after 1 sec
foo.delay(3000);
fun.delay(1000);

// зарефакторить код так, чтобы избежать двойного цикла, т.е. уменьшить сложность
const userNamesArr = [
  { name: 'Johny', id: 1 },
  { name: 'Jorn', id: 2 },
];

const userSurnamesArr = [
  { surname: 'Cash', id: 1 },
  { surname: 'Lande', id: 2 },
];

const result = [];
for (let i = 0; i < userNamesArr.length; i++) {
  if (i + 1 === userNamesArr[i].id) {
    result.push({
      name: userNamesArr[i].name,
      surname: userSurnamesArr[i].surname,
    });
  }
}
console.log(result);

// Зарефакторить код на стандарт ES7
async function funfun() {
  const value = await new Promise((res) => {
    res(1);
  });

  console.log(`value is ${value}`);
}

funfun();

// Убрать все повторяющиеся элементы из массива с наименьшей сложностью
const arr = [1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 6];
const storage = {};

for (let i = arr.length - 1; i >= 0; i--) {
  if (!(arr[i] in storage)) {
    storage[arr[i]] = true;
  } else {
    arr.splice(i, 1);
  }
}

console.log(storage);
console.log(arr);

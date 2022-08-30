const isNumber = (num) => typeof num === 'number' && !Number.isNaN(num) && Number.isFinite(num);

class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;

  constructor() {
    this.#currentFuelVolume = 0;
    this.#isStarted = false;
    this.#mileage = 0;
  }

  set brand(newBrand) {
    const errorCondition = typeof newBrand !== 'string' || newBrand.length < 1 || newBrand.length > 50;

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#brand = newBrand;
  }

  get brand() {
    return this.#brand;
  }

  set model(newModel) {
    const errorCondition = typeof newModel !== 'string' || newModel.length < 1 || newModel.length > 50;

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#model = newModel;
  }

  get model() {
    return this.#model;
  }

  set yearOfManufacturing(newYear) {
    const errorCondition = !isNumber(newYear) || newYear < 1900 || newYear > 2022;

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#yearOfManufacturing = newYear;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set maxSpeed(newSpeed) {
    const errorCondition = !isNumber(newSpeed) || newSpeed < 100 || newSpeed > 300;

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#maxSpeed = newSpeed;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxFuelVolume(newVolume) {
    const errorCondition = !isNumber(newVolume) || newVolume < 5 || newVolume > 20;

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#maxFuelVolume = newVolume;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set fuelConsumption(newConsumption) {
    const errorCondition = !isNumber(newConsumption);

    if (errorCondition) {
      throw new Error('Невалидное значение');
    }

    this.#fuelConsumption = newConsumption;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(liters) {
    const errorCondition1 = !isNumber(liters) || liters <= 0;
    const errorCondition2 = this.#currentFuelVolume + liters > this.#maxFuelVolume;

    if (errorCondition1) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (errorCondition2) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume += liters;
  }

  drive(speed, hours) {
    const errorCondition1 = !isNumber(speed) || speed <= 0;
    const errorCondition2 = !isNumber(hours) || hours <= 0;
    const errorCondition3 = speed > this.#maxSpeed;
    const errorCondition4 = !this.#isStarted;
    const distance = speed * hours;
    const requiredFuel = distance * (this.#fuelConsumption / 100);
    const errorCondition5 = requiredFuel > this.#currentFuelVolume;

    if (errorCondition1) {
      throw new Error('Неверная скорость');
    }

    if (errorCondition2) {
      throw new Error('Неверное количество часов');
    }

    if (errorCondition3) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (errorCondition4) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    if (errorCondition5) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= requiredFuel;
    this.#mileage += distance;
  }
}

module.exports = { Car, isNumber };
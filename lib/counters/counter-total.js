export class CounterTotal {
  #value;

  constructor(value) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new RangeError(`A counter total must be a non-negative integer, got ${value}`);
    }
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

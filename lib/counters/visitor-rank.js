export class VisitorRank {
  #value;

  constructor(value) {
    if (!Number.isSafeInteger(value) || value < 1) {
      throw new RangeError(`A visitor rank must be a positive integer, got ${value}`);
    }
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

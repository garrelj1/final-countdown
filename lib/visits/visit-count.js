export class VisitCount {
  #total;

  constructor(total) {
    if (!Number.isSafeInteger(total) || total < 0) {
      throw new RangeError(`A visit count must be a non-negative integer, got ${total}`);
    }
    this.#total = total;
  }

  get total() {
    return this.#total;
  }
}

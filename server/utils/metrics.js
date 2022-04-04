function metrics() {
  return {
    start: new Date(),
    end,
    duration: 0,
    calculate,
  };
}
function calculate(key) {
  if (!this[key]) {
    this[key] = { start: new Date(), duration: 0 };
    return;
  }
  if (this[key] && !this[key].start) {
    this[key].start = new Date();
    return;
  }
  this[key].duration += Date.now() - this[key].start.getTime();
  delete this[key].start;
}

function end() {
  this.end = new Date();
  // @ts-ignore
  this.duration = this.end.getTime() - this.start.getTime();
  const exludedKeys = ["start", "end", "duration"];
  Object.keys(this)
    .filter((key) => !exludedKeys.includes(key))
    .forEach((key) => {
      // @ts-ignore
      if (this[key].start) this.calculate(key);
    });
  // @ts-ignore
  delete this.calculate;

  return this;
}

export { metrics };

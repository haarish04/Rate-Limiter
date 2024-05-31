class FixedWindow {
  constructor(limit, windowSize) {
    this.limit = limit;
    this.windowSize = windowSize;
    this.count = 0;
    this.window = Date.now();
  }

  handle() {
    const now = Date.now();
    const offset = window - now;

    //Check if inside window
    if (offset < windowSize) {
      //Check if counter exceeded limit,
      if (count > this.limit) return false;
      else {
        count += 1;
        return true;
      }
    }

    //accept and create new window
    this.count = 1;
    this.window = now;
    return true;
  }
}

module.exports = FixedWindow;

class SlidingWindow {
  constructor(window, limit) {
    this.window = window;
    this.limit = limit;
    this.entries = {};
  }

  getCurrentWindow() {
    let currTime = Math.floor(Date.now() / 1000);
    let offset = currTime % this.window;
    return [currTime + offset, offset];
  }
}
module.exports = SlidingWindow;

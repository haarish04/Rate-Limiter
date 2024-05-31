class SlidingWindow {
  constructor(limit, windowSize, status) {
    this.limit = limit;
    this.windowSize = windowSize;
    this.lastWindow = Date.now();
    this.prevCount = 0;
    this.count = 1;
  }

  handle() {
    //if new request falls in next window, push the window boundary by the size of the window
    //Prev count becomes current count
    //Current count becomes 0, start new window
    if (Date.now() - this.lastWindow > this.windowSize) {
      this.now = Date.now();
      this.prevCount = this.count;
      this.count = 0;
      this.lastWindow = this.lastWindow + this.windowSize;
    }

    //The weighted count will be considered now, suppose the new req comes in x secs after the window,
    //we consider the previous window and count the requests from x secs before window started
    //By doing this we consider the window while crossing the boundary as well
    let estimatedCount =
      this.prevCount *
        ((this.windowSize - (this.now - this.lastWindow)) / this.windowSize) +
      this.count;
    if (estimatedCount > this.limit) return false;

    this.count++;
    return true;
  }
}
module.exports = SlidingWindow;

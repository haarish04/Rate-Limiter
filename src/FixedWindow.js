function FixedWindow(limit, windowSize) {
  let count = limit;
  let lastWindow = Date.now();

  return function handleRequest() {
    const now = Date.now();
    const elapsed = now - lastWindow;

    //Check if inside window
    if (elapsed < windowSize) {
      //Check if counter exceeded limit, we are calculating by decrementing
      if (count >= 0) {
        count -= 1;
        return true;
      } else return false;
    }
    //Create new window
    else {
      count = limit;
      lastWindow = now;
      return true;
    }
  };
}

module.exports = FixedWindow;

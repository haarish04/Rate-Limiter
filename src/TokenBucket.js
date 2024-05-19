function TokenBucket(rate, capacity) {
  let tokens = capacity;
  let lastCheck = Date.now();

  return function handle() {
    const now = Date.now();
    const deltaTime = now - lastCheck;
    lastCheck = now;

    //deltatime will give the secs elapsed * rate will give the number of tokens to be replenished, divided by 1000 as 1000 is one sec, our rate is per sec
    const newToken = (deltaTime * rate) / 1000;

    //min because if rate it too high and user is low, the tokens may go beyond capacity and we are calculating tokens and users on a decrementing basis
    tokens = Math.min(capacity, tokens + newToken);

    //if tokens left in bucket decrement, if all used up, limit the users
    if (tokens < 1) return false;
    else {
      tokens -= 1;
      return true;
    }
  };
}

module.exports = TokenBucket;

class TokenBucket {
  constructor(rate, max) {
    this.rate = rate;
    this.max = max;
    this.lastCheck = Date.now();
    this.tokens = max;
  }

  handle() {
    const now = Date.now();
    const elapsed = this.lastCheck - now;

    //deltatime will give the secs elapsed * rate will give the number of tokens to be replenished, divided by 1000 as 1000 is one sec, our rate is per sec
    const newToken = (elapsed * rate) / 1000;

    //min because if rate it too high and user is low, the tokens may go beyond capacity and we are calculating tokens and users on a decrementing basis
    tokens = Math.min(this.max, tokens + newToken);

    //if tokens left in bucket decrement, if all used up, limit the users
    if (tokens <= 0) return false;

    tokens -= 1;
    return true;
  }
}

module.exports = TokenBucket;

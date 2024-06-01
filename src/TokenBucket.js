class TokenBucket {
  constructor(rate, max) {
    this.rate = rate;
    this.max = max;
    this.lastCheck = Date.now();
    this.tokens = max;
  }

  handle() {
    const now = Date.now();
    const elapsed = now - this.lastCheck;

    //deltatime will give the secs elapsed * rate will give the number of tokens to be replenished, divided by 1000 as 1000 is one sec, our rate is per sec
    const newToken = (elapsed * this.rate) / 1000;

    //min because if rate it too high and user is low, the tokens may go beyond capacity and we are calculating tokens and users on a decrementing basis
    this.tokens = Math.min(this.max, this.tokens + newToken);

    //if tokens all used up, limit the users
    if (this.tokens <= 0) return false;

    this.lastCheck = now;
    this.tokens -= 1;
    return true;
  }
}

module.exports = TokenBucket;

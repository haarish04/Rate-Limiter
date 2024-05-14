function TokenBucket(rate, capacity) {
  let tokens = capacity;
  let lastCheck = Date.now();

  return function handle() {
    const now = Date.now();
    const deltaTime = now - lastCheck;
    lastCheck = now;

    const newToken = (deltaTime * rate) / 1000;
    tokens = Math.min(capacity, tokens + newToken);

    if (tokens < 1) return false;
    else {
      tokens -= 1;
      return true;
    }
  };
}

module.exports = TokenBucket;

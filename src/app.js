const express = require("express");
const TokenBucket = require("./TokenBucket");
const SlidingWindow = require("./SlidingWindow");
const FixedWindow = require("./FixedWindow");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const handleTokens = TokenBucket(25, 35); //25 tokens/sec and max capacity of 35
const handleSlidingWindow = SlidingWindow(15, 1000); // 15 requests per second
const handleFixedWindow = FixedWindow(15, 1000); // 15 requests per second

//Landing page, using token bucket algo
app.get("/", (req, res) => {
  if (handleTokens()) res.send("Welcome Page");
  else res.status(429).send("Bucket empty");
});

//Confirm status page, using fixed window algo
app.get("/status", (req, res) => {
  if (handleSlidingWindow()) res.send("Working!");
  else res.status(429).send("Window overloaded");
});

//Limited endpoint
app.get("/limited", (req, res) => {
  if (handleFixedWindow()) res.send("Working !");
  else res.status(429).send("Window overloaded");
});

//Unlimited endpoint
app.get("/unlimited", (req, res) => {
  res.send("Unlimited!");
});

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

const handleTokens = new TokenBucket(15, 20); //15 tokens/sec and max capacity of 20
const handleSlidingWindow = new SlidingWindow(15, 1000); // 15 requests per second
const handleFixedWindow = new FixedWindow(15, 1000); // 15 requests per second

//Landing page, using token bucket algo
app.get("/", (req, res) => {
  if (handleTokens.handle()) res.send("Welcome Page");
  else res.status(429).send("Bucket empty");
});

//Confirm status page, using fixed window algo
app.get("/status", (req, res) => {
  if (handleSlidingWindow.handle()) res.send("Working!");
  else res.status(429).send("Window overloaded");
});

//Limited endpoint
app.get("/limited", (req, res) => {
  if (handleFixedWindow.handle()) res.send("Working !");
  else res.status(429).send("Window overloaded");
});

//Unlimited endpoint
app.get("/unlimited", (req, res) => {
  res.send("Unlimited!");
});

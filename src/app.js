const express = require("express");
const TokenBucket = require("./TokenBucket");
const FixedWindow = require("./FixedWindow");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const handleTokens = TokenBucket(25, 35); //25 tokens/sec and max capacity of 35
const handleWindow = FixedWindow(15, 1000); // 15 requests per second

//Landing page
app.get("/", (req, res) => {
  if (handleTokens()) res.send("Welcome Page");
  else res.status("429").send("Bucket empty");
});

//Confirm status page
app.get("/status", (req, res) => {
  if (handleWindow()) res.send("Working!");
  else res.status("429").send("Window overloaded");
});

//Limited endpoint

app.get("/limited", (req, res) => {
  res.send("Limited!");
});

//Unlimited endpoint
app.get("/unlimited", (req, res) => {
  res.send("Unlimited!");
});

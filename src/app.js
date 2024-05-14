const express = require("express");
const TokenBucket = require("./TokenBucket");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Landing page
app.get("/", (req, res) => {
  if (handleTokens) res.send("Welcome Page");
  else res.send("L");
});

//Confirm status page
app.get("/status", (req, res) => {
  res.send("Working!");
});

//Limited endpoint

app.get("/limited", (req, res) => {
  res.send("Limited!");
});

//Unlimited endpoint
app.get("/unlimited", (req, res) => {
  res.send("Unlimited!");
});

const handleTokens = TokenBucket(25, 35);

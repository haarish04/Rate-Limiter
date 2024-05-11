const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Landing page
app.get("/", (request, repsonse) => {
  repsonse.send("Welcome Page");
});

//Confirm status page
app.get("/status", (request, repsonse) => {
  repsonse.send("Working!");
});

//Limited endpoint
app.get("/limited", (request, response) => {
  response.send("Excess load");
});

//Unlimited endpoint
app.get("/unlimited", (request, response) => {
  response.send("Unlimited!");
});

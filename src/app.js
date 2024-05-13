import express from "express";

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
  response.send("Limited!");
});

//Unlimited endpoint
app.get("/unlimited", (request, response) => {
  response.send("Unlimited!");
});

// function limitRequests(maxBurst, perSecond) {
//   const bucket = new TokenBucket(maxBurst, perSecond);

//   return function limiRequestsMiddleware(req, res, next) {
//     if (bucket.take()) next();
//     else res.status(429).send("Rate limit exceeded");
//   };
// }

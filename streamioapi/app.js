const express = require("express");
const cors = require("cors");
const stream = require("getstream");
// instantiate a new client (server side)
const client = stream.connect(
  "xmze4hbhjfuc",
  "pt45wfcrawg94g5txuyt4rguvs4j63a5zjwtxb2durz6wpka9vjepnajy2nrz2un",
  "1137426"
);

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json("done");
});
app.get("/token", (req, res) => {
  const userToken = client.createUserToken("the-user-id");
  res.json({
    userToken,
  });
});
app.listen(4001, () => {
  console.log("listen 4001");
});

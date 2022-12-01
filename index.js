import datboisFP from "./api/datboisFP.js";
import collectionFP from "./api/collectionFP.js";
import walletStats from "./api/walletStats.js";
import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "deez nuts" }));
});

app.use("/datbois", datboisFP);
app.use("/floor", collectionFP);
app.use("/wallet", walletStats);

app.listen(PORT, () =>
  console.log(`server listening to http://localhost:${PORT}`)
);

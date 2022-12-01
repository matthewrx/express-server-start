import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const fetchFloorPrice = async () => {
      const response = await fetch(
        `https://api-mainnet.magiceden.dev/v2/collections/datbois/stats`
      );
      const data = await response.json();

      res.send(data);
    };
    fetchFloorPrice();
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

export default router;

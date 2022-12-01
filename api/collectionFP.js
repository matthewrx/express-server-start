import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:collectionName", (req, res) => {
  try {
    const fetchFloorPrice = async () => {
      const collectionName = req.params.collectionName.replace(/ /g, "_");
      const response = await fetch(
        `https://api-mainnet.magiceden.dev/v2/collections/${collectionName}/stats`
      );
      const data = await response.json();
      const formatData = {
        symbol: data.symbol,
        floorPrice: (data.floorPrice / 1000000000).toLocaleString(),
        listedCount: data.listedCount.toLocaleString(),
        avgPrice24hr: (data.avgPrice24hr / 1000000000).toLocaleString(),
        volumeAll: (data.volumeAll / 1000000000).toLocaleString(),
      };
      console.log(formatData);
      res.send(formatData);
    };
    fetchFloorPrice();
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

export default router;

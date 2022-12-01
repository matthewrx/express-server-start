import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:walletaddress", (req, res) => {
  try {
    const collectionFP = async (collection) => {
      try {
        const response = await fetch(
          `https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`
        );
        const data = await response.json();
        const formatData = (data.floorPrice / 1000000000).toLocaleString();
        return formatData;
      } catch (e) {
        console.log(e);
      }
    };
    const fetchFloorPrice = async () => {
      const walletaddress = req.params.walletaddress.replace(/ /g, "_");
      const response = await fetch(
        `https://api-mainnet.magiceden.dev/v2/wallets/${walletaddress}/tokens?offset=0&limit=500`
      );
      const data = await response.json();
      let collections = [];
      for (let i = 0; i < data.length; i++) {
        const collection = data[i].collection;
        console.log(collection);
        if (collection != undefined) {
          const FP = await collectionFP(collection);
          collections.push({ collection: collection, floor: FP });
        }
      }
      res.send(collections);
    };
    fetchFloorPrice();
  } catch (e) {
    res.status(400).send(JSON.stringify({ error: e }));
  }
});

export default router;

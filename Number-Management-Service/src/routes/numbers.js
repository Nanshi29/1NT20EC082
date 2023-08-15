const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { targetUrl } = req.query;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  const urlList = Array.isArray(targetUrl) ? targetUrl : [targetUrl];
  const urlPromises = [];

  urlList.forEach((u) => {
    urlPromises.push(
      axios
        .get(u)
        .then((response) => response.data.items)
        .catch(() => [])
    );
  });

  try {
    const itemsArrays = await Promise.all(urlPromises);
    const mergedItems = [].concat(...itemsArrays);
    const uniqueSortedItems = Array.from(new Set(mergedItems)).sort(
      (a, b) => a - b
    );

    res.json({ items: uniqueSortedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

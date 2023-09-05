const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", async (req, res, next) => {
  let page = req.params.id - 1;
  axios
    .get(
      `https://rest.coinapi.io/v1/exchanges?apikey=FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9`
    )
    .then((API) => {
      if (API.status === 200) {
        let totalPages =
          Math.floor(API?.data.length / 10) +
          Number(API?.data.length % 10 === 0 ? 0 : 1);
        let list = API?.data.slice(page * 10, page * 10 + 10);
        res.status(200).json({
          data: list,
          currentPage: +req.params.id,
          totalPages: totalPages,
        });
      } else {
        res.status(500).json({
          data: [],
          currentPage: +req.params.id,
          totalPages: 0,
        });
      }
    });
});

module.exports = router;

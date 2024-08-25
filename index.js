const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5001;
const Moralis = require("moralis").default;

require("dotenv").config({ path: ".env" });
app.use(cors());

app.use(express.json());

//MORALIS
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/addressActivity", async (req, res) => {
  try {
    const { query } = req;
    const { address } = query;

    if (!address) {
      return res.status(400).json({ error: "Missing address parameter" });
    }

    const response = await Moralis.EvmApi.wallets.getWalletActiveChains({
      "chains": [
      "0x1",
      "0x89",
      "0x38",
      "0xa86a",
      "0xfa",
      "0x2105",
      "0x19",
      "0xa4b1",
      "0x64",
      "0xa"
    ],
      address,
    });
    
    console.log(response.raw);


    return res.status(200).json(response.raw);
  } catch (e) {
    console.log(`Something went wrong: ${e}`);
    return res.status(400).json({ error: "An error occurred", details: e.message });
  }
});



Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls on port ${port}`);
  });
});



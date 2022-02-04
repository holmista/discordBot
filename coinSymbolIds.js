const axios = require("axios");

const getInfo = async () => {
  const coins = []; // this can move to a database
  try {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    for (let { id, symbol } of res.data) {
      coins.push({ id, symbol });
    }
    console.log("ids and symbols saved successfully");
    return coins;
  } catch (e) {
    console.log("failed to save ids and symbols");
    console.log(e);
    return;
  }
};

module.exports = getInfo;

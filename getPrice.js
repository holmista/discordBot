const axios = require("axios");
const getInfo = require("./coinSymbolIds");

const getPrice = async (coinSymbol) => {
  try {
    const coins = await getInfo();
    const symbol = coinSymbol.toLowerCase();
    const coin = coins.find((elem) => elem.symbol == symbol);
    if (!coin) return;
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`
    );
    console.log("coin price gotten");
    return res.data[coin.id].usd.toString();
  } catch (e) {
    console.log("could not get coin price");
    console.log(e.message);
    return;
  }
};

getPrice("ada").then((res) => console.log(res));

module.exports = getPrice;

const axios = require("axios");

const getPrice = async (pool, coinSymbol) => {
  try {
    await pool.connect();
    const symbol = coinSymbol.toLowerCase();
    const coinId = await selectFromTable(pool, symbol);
    console.log(coinId)
    if (!coinId) return;
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    console.log(res)
    console.log(`price gotten ${res.data[coinId].usd.toString()}`)
    return res.data[coinId].usd.toString();
  } catch (e) {
    console.log(e)
    if (e.message === "database error") throw new Error("database error");
    else throw new Error("api error");
  }
};

const selectFromTable = async (pool, symbol) => {
  await pool.connect();
  try {
    const res = await pool.query("select id from coins where symbol = $1", [
      symbol,
    ]);
    if (res.rows.length === 0) return;
    return res.rows[0].id;
  } catch (e) {
    const error = new Error("database error", e.message);
    throw error;
  }
};

module.exports = getPrice;

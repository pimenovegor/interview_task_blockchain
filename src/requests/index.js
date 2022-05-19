import axios from "axios";

export async function getOHLC({ currency, vs_currency }) {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${currency}/ohlc?vs_currency=${vs_currency}&days=14`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export async function getPrice({ currency, vs_currency }) {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vs_currency}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data[currency][vs_currency]
  } catch (error) {
    console.log(error);
    throw error
  }
}

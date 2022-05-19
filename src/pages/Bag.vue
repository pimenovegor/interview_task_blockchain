<template>
  <div class="main">
    <label v-if="!error" class="common_price_label" for="commno_price"
      >Common price of your crypto currencys</label
    >
    <p v-if="!error" class="common_price">{{ commonPrice }} USD</p>
    <p v-else>{{ error }}</p>
    <div class="manage_field">
      <div class="currency">
        <label for="">Bitcoin</label>
        <p class="money">{{ bitcoin }}</p>
        <div class="btns_row">
          <button @click="bitcoin -= 1" class="edit_btn">-</button>
          <button @click="bitcoin += 1" class="edit_btn">+</button>
        </div>
      </div>
      <div class="currency">
        <label for="">Ethereum</label>
        <p class="money">{{ ethereum }}</p>
        <div class="btns_row">
          <button @click="ethereum -= 1" class="edit_btn">-</button>
          <button @click="ethereum += 1" class="edit_btn">+</button>
        </div>
      </div>
    </div>
    <BagDiagram :dataProp="[bitcoinUsd, ethereumUsd]" />
  </div>
</template>

<script>
import { getPrice } from "@/requests/index.js";
import BagDiagram from "@/components/BagDiagram";

export default {
  components: {
    BagDiagram,
  },
  data: () => ({
    bitcoin: 3,
    ethereum: 5,
    bitcoinPrice: 0,
    ethereumPrice: 0,
    error: "",
  }),
  created() {
    this.getData();
  },
  computed: {
    commonPrice() {
      this.getPrice();
      this.saveData();
      return this.bitcoinUsd + this.ethereumUsd;
    },
    bitcoinUsd(){
      return this.bitcoinPrice * this.bitcoin
    },
    ethereumUsd(){
      return this.ethereumPrice * this.ethereum
    }
  },
  methods: {
    async getPrice() {
      try {
        this.bitcoinPrice = await getPrice({
          currency: "bitcoin",
          vs_currency: "usd",
        });
        this.ethereumPrice = await getPrice({
          currency: "ethereum",
          vs_currency: "usd",
        });
      } catch (error) {
        this.error = error.message;
      }
    },
    getData() {
      Number(localStorage.bitcoin)
        ? (this.bitcoin = Number(localStorage.bitcoin))
        : false;
      Number(localStorage.ethereum)
        ? (this.ethereum = Number(localStorage.ethereum))
        : false;
    },
    saveData() {
      localStorage["bitcoin"] = this.bitcoin;
      localStorage["ethereum"] = this.ethereum;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.common_price_label {
  margin: 30px;
}
.common_price{
  font-size: 25px;
  font-weight: bold;
  color: rgb(66, 66, 66);
}
.manage_field {
  margin-top: 30px;
  display: flex;
}
.currency {
  margin: 30px;
}
.money {
  text-align: center;
  width: 100px;
  padding: 5px;
  border: 2px solid rgb(190, 87, 39);
  border-radius: 5px;
}
.btns_row {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.edit_btn {
  width: 45%;
  background-color: white;
  border: 2px solid rgb(190, 87, 39);
  border-radius: 5px;
}
.edit_btn:active {
  background-color: rgb(218, 218, 218);
}
</style>

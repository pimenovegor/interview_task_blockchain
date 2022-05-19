<template>
  <div class="main">
    <h2 class="name">Currency Converter</h2>

    <div class="converter">
      <label for="result">Result</label>
      <div class="converter_result">{{ result }}</div>
      <div class="convert_field">

        <div class="convert_from">
          <label for="convert_input">From</label>
          <input v-model="money" class="convert_input" type="number" />
          <select
            v-model="currencyFrom"
            class="convert_select convert_select_from"
            name=""
            id=""
          >
            <option selected disabled>Выбирите валюту..</option>
            <option value="bitcoin">BTC</option>
            <option value="ethereum">ETH</option>
          </select>
        </div>

        <div class="convert_to">
          <label for="convert_select">To</label>
          <select
            v-model="currencyTo"
            class="convert_select convert_select_to"
            name=""
            id=""
          >
            <option selected disabled>Выбирите валюту..</option>
            <option value="usd">USD</option>
            <option v-if="currencyFrom !== 'bitcoin'" value="btc">BTC</option>
            <option v-if="currencyFrom !== 'ethereum'" value="eth">ETH</option>
          </select>
        </div>
      </div>
    </div>

    <div class="diagrams">
      <RateDiagram :currencyFrom="'bitcoin'" :currencyTo="'usd'" />
      <RateDiagram :currencyFrom="'ethereum'" :currencyTo="'usd'" />
    </div>
  </div>
</template>

<script>
import RateDiagram from "@/components/RateDiagram.vue";
import { getPrice } from "@/requests/index.js";

export default {
  components: {
    RateDiagram,
  },
  data: () => ({
    currencyFrom: "bitcoin",
    money: 1,
    currencyTo: "usd",
    price: 0,
  }),
  computed: {
    result() {
      if (!this.currencyFrom || !this.currencyTo || !this.money) return;
      this.getPrice();
      return this.price * this.money;
    },
  },
  methods: {
    async getPrice() {
      this.price = await getPrice({
        currency: this.currencyFrom,
        vs_currency: this.currencyTo,
      });
    },
  },
};
</script>

<style scoped>
.main {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name {
  margin: 30px;
  color: rgb(66, 66, 66);
}
.converter {
  align-self: center;
  display: flex;
  flex-direction: column;
}

.diagrams {
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.convert {
  display: flex;
  flex-direction: column;
}
.converter_result {
  padding: 10px;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  border: 2px solid rgb(190, 87, 39);
}
.convert_field {
  margin-top: 10px;
  display: flex;
}
.convert_to {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.convert_from {
  display: flex;
  flex-direction: column;
}
.convert_input {
  text-align: center;
  height: 30px;
  background-color: white;
  border-radius: 5px;
  border: 2px solid rgb(190, 87, 39);
}
.convert_select {
  background-color: white;
  border-radius: 5px;
  border: 2px solid rgb(190, 87, 39);
}
.convert_select_to {
  height: 60px;
}
.convert_select_from {
  margin-top: 5px;
}
</style>

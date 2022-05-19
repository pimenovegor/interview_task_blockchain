<template>
  <div class="main">
    <h4 v-if="!error" class="name"
      >{{ currencyName }} to {{ currencyTo.toUpperCase() }} rate for 14
      days</h4
    >
    <apexchart
      v-if="!error"
      class="chart"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
    <p v-else>{{ error }}</p>
  </div>
</template>

<script>
import { getOHLC } from "@/requests/index.js";

export default {
  props: {
    currencyFrom: {
      default: "",
      type: String,
    },
    currencyTo: {
      default: "",
      type: String,
    },
  },
  data: () => ({
    chartData: [],
    chartOptions: {
      chart: {
        type: "candlestick",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
    error: "",
  }),
  created() {
    this.getData();
  },
  computed: {
    currencyName() {
      return (
        this.currencyFrom[0].toUpperCase() + this.currencyFrom.substring(1)
      );
    },
  },
  methods: {
    async getData() {
      try {
        let data = await getOHLC({
          currency: this.currencyFrom,
          vs_currency: this.currencyTo,
        });
        data = data.map((el) => ({
          x: new Date(el[0]),
          y: [el[1], el[2], el[3], el[4]],
        }));
        this.chartData = [{data}]
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 20px;
}
.name {
  font-weight: 100;
  margin: 5px;
}
.chart {
  width: 60vh;
}
</style>

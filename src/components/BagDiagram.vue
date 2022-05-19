<template>
  <div class="main">
    <label class="label" for="Сhart"></label>
    <apexchart
      class="chart"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    dataProp: {
      default: () => [],
      type: Array,
    },
  },
  data: () => ({
    chartData: [
      {
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Bitcoin", "Ethereum"],
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  }),
  watch: {
    dataProp() {
      this.chartData = [{ name: "USD", data: this.dataProp }];
    },
  },
};
</script>

<style scoped>
.main {
  margin: 20px;
}
.label {
  margin: 5px;
}
.chart {
  width: 60vh;
}
</style>

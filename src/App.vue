<template>
  <Layout />
  <router-view />
</template>

<script>
import Layout from "@/components/Layout";

export default {
  components: {
    Layout,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

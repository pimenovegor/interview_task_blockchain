<template>
  <div class="main">
      <img class="logo" src="../png/exchange_logo.png" alt="">
      <router-link class="link" v-if="this.$route.name!=='Converter'" to="/">Converter</router-link>
      <router-link class="link" v-if="this.$route.name!=='Bag'" to="/bag">CryptoBag</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main{
    display: flex;
    justify-content: space-between;
    background-color: rgb(190, 87, 39);
    padding: 5px;
    margin: 10px;
    border-radius: 5px;
}
.logo{
    height: 50px;
    width: 70px;
}
.link{
    margin: 10px;
    align-self: center;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    color:white;
}
.link:hover{
    color:rgb(238, 238, 238);
}
</style>
<template>
  <div id="app">
    <el-input v-model="input" placeholder="请输入内容" v-on:keydown.enter.native="search"></el-input>

    <ul>
      <li v-for="l in list">{{l.title}}</li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  mounted(){

    this.search();




  },
  data(){
    return {
      input:"",
      list:[],
    };
  },
  methods:{
    async search(){
      let data=await axios.get("http://search.aixifan.com/search?q="+this.input+"&pageSize=999999&parentChannelId=63&sortField=releaseDate");
      console.log(data);
      this.list=data.data.data.page.list;
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

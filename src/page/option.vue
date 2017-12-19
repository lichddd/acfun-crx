<template>
  <div id="app">
    <el-form label-width="100px">
      <el-form-item label="刷新时间(秒)">
        <el-input-number v-model="time" :min="60" :max="3600" label="新文章数量刷新时间"></el-input-number>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  mounted(){

              chrome.storage.sync.get({time:60},(item)=>{

                this.time=item.time;

              });

  },
  data(){
    return {
      time:60,
    };
  },
  methods:{
  },
  watch:{
    time(){

      chrome.storage.sync.set({time:this.time},()=>{
      });

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
  min-width: 640px;
  max-height: 600px;
}
.el-table .cell {
    overflow: initial;
}
.el-badge__content {
    z-index: 1;
}
::-webkit-scrollbar {
  width: 3px;
  height: 8px;
}


/* 轨道样式 */

::-webkit-scrollbar-track {}


/* Handle样式 */

::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.2);
}


/*当前窗口未激活的情况下*/

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.1);
}


/*hover到滚动条上*/

::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgba(0, 0, 0, 0.3);
}


/*滚动条按下*/

::-webkit-scrollbar-thumb:vertical:active {
  background-color: rgba(0, 0, 0, 0.7);
}

</style>
<style scoped="">
.table
{
  text-align: left;
}
</style>

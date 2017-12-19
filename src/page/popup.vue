<template>
  <div id="app">
    <el-table class="table"
          :data="list"
          max-height="300"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.description" effect="light" style="    display: inline-grid;">
                <div slot="content">
                  <h2 style="margin:0px;">{{scope.row.title}}</h2>
                  <h6 style="margin:0px;margin-bottom:10px;">{{scope.row.description}}</h6>
                  <img v-show="scope.row.cover_image" style="width:100px;height:100px;float: left; margin-right: 10px;" :src="scope.row.cover_image" alt="">
                  <!-- <br/> -->
                  <el-tag size="small" v-for="t in scope.row.tag_list"  style="margin-right:10px;">{{ t.name }}</el-tag>

                </div>
                <el-badge :value="scope.row.comment_count">
                  <span @click="go(scope.row)" style="cursor:pointer;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:block;">{{scope.row.title}}</span>
                </el-badge>

              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column
            width="80"
            prop="channel_name"
            label="分区">
          </el-table-column>
          <div style="text-align:center" slot="append" v-show="page<totalPage"><el-button @click="search(true)" type="text" :loading="isloading" >{{isloading?'加载中':'更多'}}</el-button></div>

    </el-table>
    <el-button type="button" name="button" v-on:click="open">查询</el-button>

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
      page:1,
      size:20,
      totalPage:0,
      isloading:false,
    };
  },
  methods:{
    async search(more){
      if (more) {
        this.page+=1;
        this.isloading=true;
        try {
          let data=await axios.get(`http://webapi.aixifan.com/query/article/list?pageNo=${this.page}&size=${this.size}&filterTitleImage=true`);
          data.data.data.articleList.forEach((l)=>{

            this.list.push(l);

          });
          this.totalPage=data.data.data.totalPage;
        } catch (e) {
          console.error(e);
        } finally {
          this.isloading=false;
        }

      } else {
        this.page=1;
        this.isloading=true;
        try {
          let data=await axios.get(`http://webapi.aixifan.com/query/article/list?pageNo=${this.page}&size=${this.size}&filterTitleImage=true`);
          this.list=data.data.data.articleList;
          this.totalPage=data.data.data.totalPage;
          let lastid=0;
          this.list.forEach((l)=>{
            lastid=l.id>lastid?l.id:lastid;
          });
          chrome.storage.sync.set({lastid:lastid},()=>{
            chrome.browserAction.setBadgeText({text: ""});
          });
        } catch (e) {
          console.error(e);
        } finally {
          this.isloading=false;
        }

      }

    }
    ,
    open(){
window.open(chrome.extension.getURL('page/index.html'));

},
go(row){
  window.open(`http://www.acfun.cn/a/ac${row.id}`);

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

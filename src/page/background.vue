<template>
  <div id="app">

  </div>
</template>

<script>
import axios from 'axios'
import timermixin from '../mixin/TimerMixin'


export default {
  name: 'app',
  // mixins:[timermixin('refresh',60000)],
  mounted(){
    this.refresh();

  },
  data(){
    return {
      list:[],
      page:1,
      size:200,
      totalPage:0,
      isloading:false,
    };
  },
  methods:{
    async refresh(){

        this.page=1;
        this.isloading=true;
        try {
          let data=await axios.get(`http://webapi.aixifan.com/query/article/list?pageNo=${this.page}&size=${this.size}&filterTitleImage=true`);
          this.list=data.data.data.articleList;

          chrome.storage.sync.get({lastid:0},(item)=>{
            let count=0;
            this.list.forEach((l)=>{
              if (l.id>item.lastid) {
                count++;
              }
            });
            if (count>0) {
              chrome.browserAction.setBadgeText({text: count>99?'99+':count.toString()});
              chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
            } else {
              chrome.browserAction.setBadgeText({text: ""});
              chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
            }
          });



        } catch (e) {
          console.error(e);
        } finally {
          this.isloading=false;
        }

        chrome.storage.sync.get({time:60},(item)=>{

          setTimeout(this.refresh,item.time*1000);


        });


    }
    ,
//     open(){
// window.open(chrome.extension.getURL('page/index.html'));
//
//     }


  }
}
</script>

<style>
</style>
<style scoped="">
</style>

<template>
    <div class="headerCon">
        <div class="header">
            <div class="title">单兵系统人机工效数据综合分析与管理系统</div>
            <div class="menu">
                <div class="pic">
                    <svg class="icon iconfont" aria-hidden="true">
                        <use xlink:href="#icon-maomi"></use>
                    </svg>
                </div>
                <div class="menu-item user">赵一凡</div>
                <div class="menu-item quit" @click="quit">退出</div>
            </div>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane :label="detial.name" v-for="(detial,index) in itemList" :key="index">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    
                >
                    <el-menu-item :index='item.id.toString()' v-for="(item,index) in detial.content" :key="index" @click="gopage(item.path)">
                        {{item.name}}
                    </el-menu-item>
                </el-menu>
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
import menu from'@/assets/js/menu.js'
export default {
    name: 'header',
    data() {
      return {
        activeIndex: '1',
        itemList: menu,
        activeName: '1',
        isFixed:false
      };
    },
    mounted(){
        this.activeIndex = this.$route.path
        // window.addEventListener('scroll',this.initHeight);
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        quit(){

        },
        gopage(url){
            this.$router.push(url)
        },
        // initHeight(){
        //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //     this.isFixed = scrollTop > 158 ? true : false;
        // }
    },
    destroyed(){
        // window.removeEventListener('scroll',this.initHeight,false);
    }
}
</script>
<style lang="scss" scoped>
    .headerCon {
        z-index: 999;
         .header{
            
            height: 40px;
            line-height: 40px;
            background-color: black;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 15px;
                color: white;
                padding-left: 20px;
                box-sizing: border-box;
            }
            .menu{
                font-size: 15px;
                color: white;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .menu-item{
                    padding-right: 20px;
                    letter-spacing: 3px;
                }
                .pic{
                    padding-right: 10px;
                    line-height: 40px;
                }
            }
        }
    }
</style>

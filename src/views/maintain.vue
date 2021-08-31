<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside width="200px">
                <el-tree
                    :data="data"
                    node-key="id"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    @node-contextmenu="rightClick"
                    default-expand-all
                    :expand-on-click-node="false"
                    id="el-tree"
                >
                </el-tree>
                    <!--鼠标右键菜单栏 -->
                <div v-show="showRightMenua">
                    <ul id="menua" class="right-menu">
                        <li class="menu-item" @click="addDevHandle">
                            <i class="el-icon-circle-plus-outline"></i>
                            添加新模板
                        </li>
                        <li class="menu-item" @click="editDevHandle">
                            <i class="el-icon-circle-plus"></i>
                            清除模板
                        </li>
                    </ul>
                </div>
                <div v-show="showRightMenub">
                    <ul id="menub" class="right-menu">
                        <li class="menu-item" @click="addDevHandle">
                            <i class="el-icon-circle-plus-outline"></i>
                            添加子系统
                        </li>
                        <li class="menu-item" @click="editDevHandle">
                            <i class="el-icon-circle-plus"></i>
                            添加装备
                        </li>
                        <li class="menu-item" @click="delDevHandle">
                            <i class="el-icon-circle-close"></i>
                            清除所有
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-main :style="{ height: windowHeight + 'px' }">
                <el-empty description="暂无数据"></el-empty>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    name: 'maintain',
    components: {
        
    },
    data() {
        const data = [{
                id: 1,
                icon: 'el-icon-s-operation',
                label: '问卷调查表模板',
                obj: 1, 
                children: [{
                    id: 2,
                    label: '202010全系统',
                    icon: 'el-icon-s-operation',
                    obj: 2, 
                    children: [{
                        id: 3,
                        label: '全系统',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 7,
                            label: '全系统',
                            icon: 'el-icon-s-operation',
                            obj: 4, 
                        }]
                    },{
                        id: 4,
                        label: '头戴装备',
                        icon: 'el-icon-s-operation',
                        children: [{
                            id: 8,
                            label: '头盔',
                            icon: 'el-icon-s-operation'
                        },{
                            id: 9,
                            label: '防护眼镜',
                            icon: 'el-icon-s-operation',
                        }]
                    },{
                        id: 5,
                        label: '身背装备',
                        icon: 'el-icon-s-operation',
                        children: [{
                            label: '携行具',
                            icon: 'el-icon-s-operation',
                            children: [{
                                id: 10,
                                label: '生活背囊',
                                icon: 'el-icon-s-operation',
                            },{
                                id: 11,
                                label: '突击背包',
                                icon: 'el-icon-s-operation',
                            },{
                                id: 12,
                                label: '作战背心',
                                icon: 'el-icon-s-operation',
                            }]
                        }]
                    },{
                        id: 6,
                        label: '手持装备',
                        icon: 'el-icon-s-operation',
                        children: [{
                            id: 13,
                            label: '电子战术握把',
                            icon: 'el-icon-s-operation',
                        }]
                    },]
                }]
            }]
        return {
            data: JSON.parse(JSON.stringify(data)),
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            windowHeight: document.documentElement.clientHeight - 175,
            showRightMenu: false,
            showRightMenua: false,
            showRightMenub: false
        }
    },
    mounted() {
        window.onresize = () => {
            this.windowHeight = document.documentElement.clientHeight - 175;
        };
    },
    methods: {
        handleNodeClick(data) {
            // console.log(data);
        },
        rightClick(event, data, node, obj) {
            this.showRightMenua = false
            this.showRightMenub = false
            if(node.data.obj == 1) {
                 // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
                this.showRightMenua = true
                let menua = document.querySelector('#menua')
                menua.style.left = event.clientX + 'px'
                menua.style.top = event.clientY - 5 + 'px'
            } else if(node.data.obj == 2) {
                this.showRightMenub = true
                let menub = document.querySelector('#menub')
                menub.style.left = event.clientX + 'px'
                menub.style.top = event.clientY - 5 + 'px'
            }
            // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
            document.addEventListener('click', this.closeRightMenu)
            // console.log('event', event, event.clientX, event.clientY)
            // console.log('data', data)
            // console.log(node)
        },
        closeRightMenu() {
            this.showRightMenua = false
            this.showRightMenub = false
            // 及时关掉鼠标监听事件
            document.removeEventListener('click', this.closeRightMenu)
        },
        addDevHandle() {
        },
        editDevHandle() {
        },
        // 删除操作
        delDevHandle() {
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-aside {
        background-color: white;
        color: #333;
        text-align: center;
        height: 100%;
        
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
    .container {
        margin-top: 1px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    #el-tree {
        user-select: none;
    }
    .right-menu {
      z-index: 1;
      position: absolute;
      height: 100px;
      width: 120px;
      position: absolute;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: white;
      .menu-item {
        //display: block;
        line-height: 20px;
        text-align: left;
        padding-top: 6.5px;
        padding-bottom: 7px;
        font-size: 14px;
        color: #606266;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
        box-sizing: border-box;
      }
      li:hover {
        background-color: #edf6ff;
        color: #606266;
      }
    }
</style>

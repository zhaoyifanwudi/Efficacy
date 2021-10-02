<template>
    <div class="dataVisible">
        <el-container class="container">
            <el-aside width="240px" :style="{ height: windowHeight + 'px' }">
                <el-scrollbar>
                    <div class="buttonList">   
                        <el-button type="primary" icon="el-icon-search" class="buttonItem" @click="drawer = true">选择数据集</el-button>
                        <el-button type="warning" icon="el-icon-brush" class="buttonItem" @click="showBar('bar')">柱状图</el-button>
                        <el-button type="info" icon="el-icon-brush" class="buttonItem">二维线条图</el-button>
                        <el-button type="info" icon="el-icon-brush" class="buttonItem" @click="showBar('line')">折线图</el-button>
                        <el-button type="info" icon="el-icon-brush" class="buttonItem">面积图</el-button>
                        <el-button type="info" icon="el-icon-brush" class="buttonItem">饼图</el-button>
                        <el-button type="info" icon="el-icon-brush" class="buttonItem">直方图</el-button>
                    </div>
                </el-scrollbar>
                
            </el-aside>
            <el-main :style="{ height: windowHeight + 'px' }">
                <div class="mainCon">
                    <div id="chart" class="chart"></div>
                    <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                        <el-tab-pane
                            :key="item.name"
                            v-for="(item) in editableTabs"
                            :label="item.title"
                            :name="item.name"
                        >
                            <div :id="item.id" style="width: 500px;height: 400px"></div>
                        </el-tab-pane>
                    </el-tabs> -->
                </div>
                
            </el-main>
        </el-container>
        <el-drawer
            title="数据集"
            :with-header = "false"
            v-model="drawer"
            direction="rtl"
            size="20%"
        >
            <div class="drawer" :style="{ height: drawerHeight + 'px' }">
                    <div class="drawerHeader">
                        数据集选择
                    </div>
                    <el-scrollbar>
                        <el-tree
                            :data="data"
                            node-key="id"
                            :props="defaultProps"
                            @node-click="handleNodeClick"
                            default-expand-all
                            :expand-on-click-node="false"
                            id="el-tree"
                        >
                            <template #default="{ node, data }">
                                <span class="custom-tree-node" @click="toContent(node)">
                                    <span>
                                        <i :class="data.icon" class="icon"></i>
                                        <span>{{ node.label }}</span>
                                    </span>
                                </span>
                            </template>
                        </el-tree>
                    </el-scrollbar>
                    
                
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    name: 'data-visible',
    data() {
        const data = [{
            id: 1,
            icon: 'el-icon-s-operation',
            label: '主观问卷列表',
            obj: 1, 
            children: [{
                id: 1,
                label: '1789团2021年装备调查',
                icon: 'el-icon-s-operation',
                obj: 2, 
                children: [{
                    id: 1,
                    label: '全系统',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 7,
                        label: '全系统',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    }]
                },{
                    id: 2,
                    label: '头戴装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 1,
                        label: '头盔',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    },{
                        id: 2,
                        label: '防护眼镜',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    }]
                },{
                    id: 3,
                    label: '身背装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        label: '携行具',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 10,
                            label: '生活背囊',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },{
                            id: 11,
                            label: '突击背包',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },{
                            id: 12,
                            label: '作战背心',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    }]
                },{
                    id: 6,
                    label: '手持装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 13,
                        label: '电子战术握把',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    }]
                },]
            }]
        },{
            id: 1,
            icon: 'el-icon-s-operation',
            label: '主观问卷列表',
            obj: 1, 
            children: [{
                id: 1,
                label: '1789团2021年装备调查',
                icon: 'el-icon-s-operation',
                obj: 2, 
                children: [{
                    id: 1,
                    label: '全系统',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 7,
                        label: '全系统',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    }]
                },{
                    id: 2,
                    label: '头戴装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 1,
                        label: '头盔',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    },{
                        id: 2,
                        label: '防护眼镜',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
                    }]
                },{
                    id: 3,
                    label: '身背装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        label: '携行具',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 10,
                            label: '生活背囊',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },{
                            id: 11,
                            label: '突击背包',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },{
                            id: 12,
                            label: '作战背心',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    }]
                },{
                    id: 6,
                    label: '手持装备',
                    icon: 'el-icon-s-operation',
                    obj: 3, 
                    children: [{
                        id: 13,
                        label: '电子战术握把',
                        icon: 'el-icon-s-claim',
                        obj: 4, 
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
            drawerHeight: document.documentElement.clientHeight - 50,
            windowHeight: document.documentElement.clientHeight - 175,
            tableHeight: 0,
            drawer: false,
            option: {
                tooltip: {},
                legend: {
                    orient: 'vertical',
                    data:['人数']
                },
                xAxis: {
                    data: ["差","较差","一般","良","优"]
                },
                yAxis: {},
                series: [{
                    name: '人数',
                    type: 'line',
                    data: [5, 20, 36, 10, 10]
                }]
            },
            editableTabsValue: '1',
            editableTabs: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content',
                id: 'chart1'
            }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content',
                id: 'chart2'
            }],
                tabIndex: 2
            }
    },
    mounted() {
        window.onresize = () => {
            this.drawerHeight = document.documentElement.clientHeight -50
            this.windowHeight = document.documentElement.clientHeight - 175
        };
        this.$nextTick(() => {
            this.tableHeight = window.innerHeight - 220;
        })
        // this.myEcharts()
    },
    methods: {
        showBar(name) {
            this.option.series[0].type = name
            // let targetName = '折线图'
            // this.addTab(targetName)
            this.myEcharts()
        },
        handleNodeClick() {

        },
        myEcharts() {
            let myCharts = this.$echarts.init(document.getElementById('chart'))
            myCharts.setOption(this.option)
        },
        addTab(targetName) {
            const newTabName = `${++this.tabIndex}`
            this.editableTabs.push({
                title: targetName,
                name: newTabName,
                content: 'New Tab content',
                id: 'chart3'
            })
            this.editableTabsValue = newTabName
        },
        removeTab(targetName) {
            const tabs = this.editableTabs
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                        activeName = nextTab.name
                        }
                    }
                })
            }
            this.editableTabsValue = activeName
            this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
        },
    }
}
</script>
<style lang="scss" scoped>
    .dataVisible {
        .drawer {
            box-sizing: border-box;
            padding-top: 10px;
            padding-left: 5px;
            .drawerHeader {
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                margin-bottom: 10px;
            }
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;
                .icon {
                    margin-right: 1px;
                    vertical-align: middle;
                }
            }
        }
        .el-aside {
            background-color: white;
            color: #333;
            text-align: center;
            height: 100%;
            .buttonList {
                width: 100%;
                margin-top: 30px;          
                .buttonItem {
                    display: block;
                    text-align: center;
                    margin-right:auto;
                    margin-left: auto;
                    margin-bottom: 20px;
                    width: 75%;
                    
                }
            }      
        }
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            .mainCon {  
                margin-left: 15px;
                box-sizing: border-box;
                background-color: white;
                height: 100%;
                text-align: center;
                padding-top: 20px;
                margin-right: 15px;
                .chart {
                    margin: 0 auto;
                    width: 70%;
                    height: 100%
                }
            }  
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
    }
</style>
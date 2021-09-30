<template>
    <div class="dataPre">
        <el-container class="container">
            <el-aside width="240px" :style="{ height: windowHeight + 'px' }">
                <el-scrollbar>
                    <div class="buttonList">   
                        <el-button type="primary" icon="el-icon-search" class="buttonItem" @click="drawer = true">选择数据集</el-button>
                        <el-button type="warning" icon="el-icon-help" class="buttonItem">标识重复个案</el-button>
                        <el-button type="info" icon="el-icon-help" class="buttonItem">比较数据集</el-button>
                        <el-button type="info" icon="el-icon-help" class="buttonItem">标识异常个案</el-button>
                        <el-button type="info" icon="el-icon-help" class="buttonItem">排序个案</el-button>
                        <el-button type="info" icon="el-icon-help" class="buttonItem">个案加权</el-button>
                    </div>
                </el-scrollbar>
                
            </el-aside>
            <el-main :style="{ height: windowHeight + 'px' }">
                <div class="mainCon">
                    <el-tabs tab-position="right">
                        <el-tab-pane :label="item.equip" v-for="(item,index) in quesList" :key="index">
                            <div class="temTable">
                                <el-table :data="item.quesListItem" style="width: 100%" border :max-height="tableHeight">
                                    <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
                                    <el-table-column prop="user" label="人员" min-width="180" fixed></el-table-column>
                                    <el-table-column :prop="itemA.prop" :label="itemA.name" min-width="180" v-for="(itemA,indexA) in item.quesListItemName" :key="indexA"></el-table-column>
                                    <el-table-column prop="desc" label="备注" min-width="180"></el-table-column>
                                </el-table>
                            </div>
                            
                        </el-tab-pane>
                    </el-tabs>
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
    name: 'data-pre',
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
            quesList: [
                {
                    equip: '头盔',
                    quesListItemName: [
                        {
                            name: '佩戴舒适性',
                            prop: 'comfortable'
                        },
                        {
                            name: '佩戴稳定性',
                            prop: 'stability'
                        },
                        {
                            name: '操作便携性',
                            prop: 'portability'
                        }
                    ],
                    quesListItem: [
                        {
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },{
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        },
                    ]
                },{
                    equip: '全系统',
                    quesListItemName: [
                        {
                            name: '佩戴舒适性',
                            prop: 'comfortable'
                        },
                        {
                            name: '佩戴稳定性',
                            prop: 'stability'
                        },
                        {
                            name: '操作便携性',
                            prop: 'portability'
                        },
                    ],
                    quesListItem: [
                        {
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        }
                    ]
                },{
                    equip: '降噪送受话器',
                    quesListItemName: [
                        {
                            name: '佩戴舒适性',
                            prop: 'comfortable'
                        },
                        {
                            name: '佩戴稳定性',
                            prop: 'stability'
                        },
                        {
                            name: '操作便携性',
                            prop: 'portability'
                        },
                    ],
                    quesListItem: [
                        {
                            user: '赵一凡',
                            desc: '无',
                            comfortable: '优',
                            stability: '良',
                            portability: '一般'
                        }
                    ]
                },
            ],
            tableHeight: 0,
            drawer: false
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
    },
    methods: {
        handleNodeClick() {

        },
    }
}
</script>
<style lang="scss" scoped>
    .dataPre {
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
                .temTable {
                    box-sizing: border-box;
                    padding-right: 12px;
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

<template>
    <div class="investigation" v-loading = "!tableData.length">
        <el-backtop></el-backtop>
        <div class="button clearfix">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addques">新建问卷调查表</el-button>
            <el-button type="primary" icon="el-icon-circle-plus">新建问卷类别</el-button>
            <el-input v-model="search" placeholder="请输入问卷名称搜索" class="name"></el-input>
        </div>
        <div class="quesList">
            <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                border
                style="width: 100%"
                max-height="445"
            >
                <el-table-column
                    fixed
                    prop="id"
                    label="Id"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="name"
                    label="问卷名称"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="cate"
                    label="问卷类别"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="set"
                    label="问卷创建人"
                    width="190"
                >
                </el-table-column>
                <el-table-column
                    prop="group"
                    label="问卷群体"
                    width="190"
                >
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="问卷创建时间"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="300"
                    fixed="right"
                >
                    <template #default="scope">
                        <el-button @click="browse(scope.row)" type="text" size="small">浏览</el-button>
                        <el-button @click="release(scope.row)" type="text" size="small">发布</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="deleteNow(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click="copy(scope.row)">复制</el-button>
                        <el-button type="text" size="small" @click="hold(scope.row)">保存至模板</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="nowques" v-show="showNowQues" id="nowques">
             <el-container>
                <el-header>
                    <i class="el-icon-s-operation"></i>
                    {{ nowName }}
                </el-header>
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
                        <div v-show="showRightMenu">
                            <ul id="menu" class="right-menu">
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
                    </el-aside>
                    <el-main :style="{ height: windowHeight + 'px' }">
                        <el-empty description="暂无数据"></el-empty>
                    </el-main>
                </el-container>
            </el-container>
        </div>
        <el-dialog
            title="提示"
            v-model="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="问卷名称" prop="name" class="form" required>
                        <el-input v-model="ruleForm.name" placeholder="请输入问卷名称"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" required class="form" prop="user">
                        <el-input placeholder="请输入创建人" v-model="ruleForm.user"></el-input>
                    </el-form-item>
                    <el-form-item label="问卷群体" required class="form" prop="role">
                        <el-input placeholder="请输入问卷群体" v-model="ruleForm.role"></el-input>
                    </el-form-item>
                    <el-form-item label="问卷类别" prop="cate" required>
                        <el-select v-model="ruleForm.cate" placeholder="请选择类别">
                            <el-option label="武器" value="operation"></el-option>
                            <el-option label="头盔" value="admin"></el-option>
                            <el-option label="防弹衣" value="expert"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">新 建</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="提示"
            v-model="dialogVisible_a"
            width="30%"
            :before-close="handleClose"
        >
            <span>
                <el-form :model="ruleForm_a" :rules="rules_a" ref="ruleForm_a" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="问卷名称" prop="name" class="form" required>
                        <el-input v-model="ruleForm_a.name" placeholder="ruleForm_a.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" required class="form" prop="user">
                        <el-input placeholder="请输入创建人" v-model="ruleForm_a.user"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" required class="form" prop="time">
                        <el-input placeholder="ruleForm_a.time" v-model="ruleForm_a.time"></el-input>
                    </el-form-item>
                    <el-form-item label="发布单位" required class="form" prop="unit">
                        <el-input placeholder="请输入发布单位" v-model="ruleForm_a.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="编写人员" required class="form" prop="aim">
                        <el-input placeholder="请输入编写人员" v-model="ruleForm_a.aim"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible_a = false">导 出</el-button>
                <el-button type="primary" @click="dialogVisible_a = false">发 布</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    
</template>
<script>
export default {
    name: 'investigation',
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
            tableData: [
                {
                    id: '1',
                    name: '202010全系统',
                    cate: '赵一凡1',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202080',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202070',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202010',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202010',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202010',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202010',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },{
                    id: '1',
                    name: '202010',
                    cate: '赵一凡',
                    set: '202010',
                    group: '武器问卷',
                    time: '2021.08.19'
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            showRightMenu: false,
            data: JSON.parse(JSON.stringify(data)),
            search: '',
            showNowQues: false,
            windowHeight: document.documentElement.clientHeight - 60,
            nowName: '',
            dialogVisible: false,
            dialogVisible_a: false,
            ruleForm: {
                name: '',
                user: '',
                role: '',
                cate: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入问卷名称', trigger: 'blur' },
                ],
                user: [
                    { required: true, message: '请输入创建人', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择问卷群体', trigger: 'blur' }
                ]
            },
            ruleForm_a: {
                name: '',
                user: '',
                time: '',
                unit: '',
                aim: ''
            },
            rules_a: {
                aim: [
                    { required: true, message: '请输入编写人员', trigger: 'blur' },
                ],
                user: [
                    { required: true, message: '请输入创建人', trigger: 'blur' },
                ],
                unit: [
                    { required: true, message: '请选择发布单位', trigger: 'blur' }
                ]
            },
        }
    },
    mounted() {
        window.onresize = () => {
            this.windowHeight = document.documentElement.clientHeight - 60;
        };
    },
    methods: {
        async browse(row) {
            await this.open(row)
            let btn = document.getElementById('nowques')
            let x = btn.offsetTop + 158
            let timer = setInterval(() => {
                document.documentElement.scrollTop += 100
                if(document.documentElement.scrollTop >= x) {
                    clearInterval(timer)
                }
            }, 20);
            let timer_1 = setInterval(() => {
                window.pageYOffset += 100
                if(window.pageYOffset >= x) {
                    clearInterval(timer_1)
                }
            }, 20);
            let timer_2 = setInterval(() => {
                document.body.scrollTop += 100
                if(document.body.scrollTop >= x) {
                    clearInterval(timer_2)
                }
            }, 20);
        },
        open(row) {
            this.showNowQues = true
            this.nowName = row.name
        },
        release(row) {
            this.dialogVisible_a = true
            this.ruleForm_a.name = row.name
            let nowdata = new Date()
            this.ruleForm_a.time = nowdata.toLocaleDateString()
        },
        edit(row) {

        },
        deleteNow(row) {

        },
        copy(row) {

        },
        hold(row) {

        },
        handleNodeClick() {

        },
        addques() {
            this.dialogVisible = true
        },
        add() {
            this.dialogVisible = false
            // todo: 创建人应从vuex中获得当前用户
        },
        rightClick(event, data, node, obj) {
            let nowheight = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            this.showRightMenu = false
            if(node.data.obj == 1) {
                 // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
                this.showRightMenu = true
                let menu = document.querySelector('#menu')
                menu.style.left = event.clientX + 'px'
                menu.style.top = event.clientY - 5 + nowheight + 'px'
            }
            // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
            document.addEventListener('click', this.closeRightMenu)
            // console.log('event', event, event.clientX, event.clientY)
            // console.log('data', data)
            // console.log(node)
        },
        closeRightMenu() {
            this.showRightMenu = false
            // 及时关掉鼠标监听事件
            document.removeEventListener('click', this.closeRightMenu)
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    }
}
</script>
<style lang="scss" scoped>
    .investigation {
        width: 100%;
        .form {
            width: 380px;
        }
        .button {
            width: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 100px;
            padding-right: 100px;
            .name {
                width: 300px;
                float: right;
            }
        }
        .quesList {
            width: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 100px;
            padding-right: 100px;
        }
        .nowques {
            width: 100%;
            box-sizing: border-box;
            padding-top: 158px;
            padding-left: 100px;
            padding-right: 100px;
            .el-header, .el-footer {
                background-color: black;
                color: white;
                text-align: center;
                line-height: 60px;
                font-size: 16px;
                letter-spacing: 1px;
            }
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
        }
    }
</style>

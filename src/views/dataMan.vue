<template>
    <div class="dataMan">
        <el-container class="container">
            <el-aside width="240px" :style="{ height: windowHeight + 'px' }">
                <el-scrollbar>
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
                    <!--鼠标右键菜单栏 -->
                <div v-show="showRightMenua">
                    <ul id="menua" class="right-menu right-menu-height-small">
                        <li class="menu-item" @click="addDevHandle">
                            <i class="el-icon-circle-plus-outline"></i>
                            新建问卷
                        </li>
                        <li class="menu-item" @click="editDevHandle">
                            <i class="el-icon-circle-plus"></i>
                            清除模板
                        </li>
                    </ul>
                </div>
                <div v-show="showRightMenub">
                    <ul id="menub" class="right-menu right-menu-height-max">
                        <li class="menu-item" @click="addSubSystemHandle">
                            <i class="el-icon-circle-plus-outline"></i>
                            添加子系统
                        </li>
                        <li class="menu-item" @click="addequipmentHandle">
                            <i class="el-icon-circle-plus"></i>
                            添加装备
                        </li>
                        <li class="menu-item" @click="issueQues">
                            <i class="el-icon-circle-close"></i>
                            发布问卷
                        </li>
                        <li class="menu-item" @click="delDevHandle">
                            <i class="el-icon-circle-close"></i>
                            清除所有
                        </li>
                    </ul>
                </div>
                <div v-show="showRightMenuc">
                    <ul id="menuc" class="right-menu right-menu-height-middle">
                        <li class="menu-item" @click="addSubSystemHandle">
                            <i class="el-icon-circle-plus-outline"></i>
                            添加子系统
                        </li>
                        <li class="menu-item" @click="addequipmentHandle">
                            <i class="el-icon-circle-plus"></i>
                            添加装备
                        </li>
                        <li class="menu-item" @click="delDevHandle">
                            <i class="el-icon-circle-close"></i>
                            清除所有
                        </li>
                    </ul>
                </div>
                <div v-show="showRightMenud">
                    <ul id="menud" class="right-menu right-menu-height-min">
                        <li class="menu-item" @click="delNowItem">
                            <i class="el-icon-circle-close"></i>
                            删除
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-main :style="{ height: windowHeight + 'px' }">
                <el-empty description="暂无数据" v-if="showEmpty"></el-empty>
                <div class="content" v-else>
                    <div class="leftCon">
                        <div class="leftConHeader">
                            <div class="conButton clearfix">
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addEvaluationItem">新增</el-button>
                                <el-button type="primary" icon="el-icon-circle-plus" class="buttonLeft" @click="deleteEvaluationItem">导出</el-button>
                            </div>
                            <div class="leftConHeaderRight">
                                <i class="el-icon-warning"></i>
                                双击编辑试验数据
                            </div>
                        </div>
                        <div class="temTable">
                            <el-table :data="temData.temTableData" style="width: 100%" border :max-height="tableHeight" @row-dblclick="dblclick">
                                <el-table-column prop="id" label="编号" min-width="50"> </el-table-column>
                                <el-table-column prop="user" label="被试者" min-width="150"> </el-table-column>
                                <el-table-column prop="result" label="结果文件" min-width="150"> </el-table-column>
                                <el-table-column prop="time" label="试验时间" min-width="150"> </el-table-column>
                                <el-table-column prop="test" label="测试/分析人员" min-width="150"> </el-table-column>
                                <el-table-column prop="desc" label="备注" min-width="150"> </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="temDesc">
                        <el-form :model="ruleForm_g" ref="ruleForm_g" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="文件名" prop="result" class="form">
                                <el-input v-model="ruleForm_g.result" placeholder="请输入文件名称"></el-input>
                            </el-form-item>
                            <el-form-item label="被试者" class="form" prop="user">
                                <el-input placeholder="请输入被试者" v-model="ruleForm_g.user"></el-input>
                            </el-form-item>
                            <el-form-item label="测试人员" class="form" prop="test">
                                <el-input placeholder="请输入测试人员" v-model="ruleForm_g.test"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" class="form" prop="resc">
                                <el-input placeholder="请输入备注" v-model="ruleForm_g.resc"></el-input>
                            </el-form-item>
                            <el-form-item label="起始时间" class="form" prop="vBegin">
                                <el-date-picker
                                    v-model="ruleForm_g.vBegin"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间" class="form" prop="eBegin">
                                <el-date-picker
                                    v-model="ruleForm_g.eBegin"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                        <span class="temDescFooter">
                            <el-button @click="resetForm('ruleForm_g')" class="buttonRight" size="small">重 置</el-button>
                            <el-button type="primary" @click="updataItem" size="small">查 询</el-button>
                        </span>
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-dialog
            title="新建问卷"
            v-model="temDialog"
            width="30%"
            :before-close="handleClose"
            center
        >
            <span>
                <el-form :model="ruleForm_a" :rules="rules" ref="ruleForm_a" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="问卷名称" prop="name" class="form" required>
                        <el-input v-model="ruleForm_a.name" placeholder="请输入问卷名称"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" required class="form" prop="user">
                        <el-input placeholder="请输入创建人" v-model="ruleForm_a.user"></el-input>
                    </el-form-item>
                    <el-form-item label="问卷群体" required class="form" prop="role">
                        <el-input placeholder="请输入问卷群体" v-model="ruleForm_a.role"></el-input>
                    </el-form-item>
                    <el-form-item label="引用模板" prop="cate" required>
                        <el-select v-model="ruleForm_a.cate" placeholder="请选择模板">
                            <el-option label="无" value="0"></el-option>
                            <el-option label="全系统2021" value="1"></el-option>
                            <el-option label="全系统2020" value="2"></el-option>
                            <el-option label="全系统2019" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="resetForm('ruleForm_a')" class="buttonRight">取 消</el-button>
                <el-button type="primary" @click="addQues">新 建</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="添加子系统"
            v-model="temDialog_a"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_b" ref="ruleForm_b" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="编号" prop="id" class="form" required>
                        <el-input v-model="ruleForm_b.id" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="模板名称" class="form" prop="name" required>
                        <el-input placeholder="请输入子系统名称" v-model="ruleForm_b.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人员" class="form" prop="user" required>
                        <el-input placeholder="请输入创建人员" v-model="ruleForm_b.user"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" class="form" prop="desc" required>
                        <el-input placeholder="请输入说明" v-model="ruleForm_b.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                 <el-button @click="resetForm('ruleForm_b')" class="buttonRight">重 置</el-button>
                <el-button type="primary" @click="addSubSystem">添 加</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="添加装备"
            v-model="temDialog_b"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_c" ref="ruleForm_c" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="编号" prop="id" class="form" required>
                        <el-input v-model="ruleForm_c.id" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="装备名称" class="form" prop="name" required>
                        <el-input placeholder="请输入装备名称" v-model="ruleForm_c.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人员" class="form" prop="user" required>
                        <el-input placeholder="请输入创建人员" v-model="ruleForm_c.user"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" class="form" prop="desc" required>
                        <el-input placeholder="请输入说明" v-model="ruleForm_c.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="resetForm('ruleForm_c')" class="buttonRight">重 置</el-button>
                <el-button type="primary" @click="addequipment">添 加</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="增加评价项"
            v-model="temDialog_c"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_d" ref="ruleForm_d" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="序号" prop="name" class="form" required>
                        <el-input v-model="ruleForm_d.name" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="form" prop="desc" required>
                        <el-input placeholder="请输入装备名称" v-model="ruleForm_d.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="resetForm('ruleForm_d')" class="buttonRight">重 置</el-button>
                <el-button type="primary" @click="addEvaluation">增 加</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="发布"
            v-model="temDialog_d"
            width="30%"
            :before-close="handleClose"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_e" :rules="rules_e" ref="ruleForm_e" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="问卷名称" prop="name" class="form" required>
                        <el-input v-model="ruleForm_e.name" :placeholder="ruleForm_e.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" required class="form" prop="user">
                        <el-input placeholder="请输入创建人" v-model="ruleForm_e.user"></el-input>
                    </el-form-item>
                    <el-form-item label="发布单位" required class="form" prop="unit">
                        <el-input placeholder="请输入发布单位" v-model="ruleForm_e.unit"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="temDialog_d = false" class="buttonRight">导 出</el-button>
                <el-button type="primary" @click="temDialog_d = false">发 布</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="修改评价项"
            v-model="temDialog_e"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_f" ref="ruleForm_f" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="序号" prop="name" class="form" required>
                        <el-input v-model="ruleForm_f.name" placeholder="ruleForm_f.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="form" prop="desc" required>
                        <el-input placeholder="ruleForm_f.desc" v-model="ruleForm_f.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetForm('ruleForm_e')" class="buttonRight">重 置</el-button>
                    <el-button type="primary" @click="updataItem">修 改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'data-man',
    components: {
        
    },
    data() {
        const data = [{
                id: 1,
                icon: 'el-icon-s-operation',
                label: '单兵系统人机工效试验数据',
                obj: 1, 
                children: [{
                    id: 1,
                    label: '全系统试验',
                    icon: 'el-icon-s-operation',
                    obj: 2, 
                    children: [{
                        id: 1,
                        label: '适体性试验',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 1,
                            label: '试验报告',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },
                        {
                            id: 2,
                            label: '试验数据',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    },{
                        id: 2,
                        label: '操作便携性试验',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 1,
                            label: '试验报告',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },
                        {
                            id: 2,
                            label: '试验数据',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    },{
                        id: 3,
                        label: '其他类型试验',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 1,
                            label: '试验报告',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },
                        {
                            id: 2,
                            label: '试验数据',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    },{
                        id: 6,
                        label: '部队试验',
                        icon: 'el-icon-s-operation',
                        obj: 3, 
                        children: [{
                            id: 1,
                            label: '试验报告',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        },
                        {
                            id: 2,
                            label: '试验数据',
                            icon: 'el-icon-s-claim',
                            obj: 4, 
                        }]
                    },]
                }]
            }]
        const temListData = [{
                id: 1,
                label: '202010全系统',
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
        return {
            data: JSON.parse(JSON.stringify(data)),
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            temListData: JSON.parse(JSON.stringify(temListData)),
            windowHeight: document.documentElement.clientHeight - 175,
            showRightMenu: false,
            showRightMenua: false,
            showRightMenub: false,
            showRightMenuc: false,
            showRightMenud: false,
            temDialog: false,
            temDialog_a: false,
            temDialog_b: false,
            temDialog_c: false,
            temDialog_d: false,
            temDialog_e: false,
            tableHeight: 0,
            tempid: {},
            showEmpty: true,
            temData: {
                outline: '松紧适度 ',
                KeyTest: '头盔的使用试验 ',
                detailedDescription: '无 ',
                FillingInstructions: '压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀压力分布均匀',
                temTableData: [
                    {
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },{
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },{
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },{
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },{
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },{
                        id: 1,
                        user: '张三',
                        result: 'zhangsan01.txt',
                        time: '2021.10.1',
                        test: '李四',
                        desc: '压力分布均匀'
                    },
                ],
            },
            ruleForm_a: {
                id: '',
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
            ruleForm_b: {
                id: '',
                name: '',
                createTime: '',
                updateTime: '',
                user: '',
                desc: ''
            },
            ruleForm_c: {
                id: '',
                name: '',
                createTime: '',
                updateTime: '',
                user: '',
                desc: ''
            },
            ruleForm_d: {
                id: '',
                name: '',
                desc: ''
            },
            ruleForm_e: {
                name: '',
                user: '',
                time: '',
                unit: '',
            },
            rules_e: {
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
            ruleForm_f: {
                id: '',
                name: '',
                desc: ''
            },
            ruleForm_g: {
                result: '',
                user: '',
                test: '',
                desc: '',
                vBegin: '',
                eBegin: ''
            }
        }
    },
    // computed: {
    //     windowHeight() {
    //         return document.documentElement.scrollHeight - 175
    //     }
    // },
    watch: {
        windowHeight(val) {
            this.windowHeight = val
        }
    },
    mounted() {
        window.onresize = () => {
            this.windowHeight = document.documentElement.clientHeight - 175;
        };
        this.$nextTick(() => {
            this.tableHeight = window.innerHeight - 390;
            //后面的50：根据需求空出的高度，自行调整
        })
    },
    methods: {
        dblclick(row) {
            console.log(row)
            this.temDialog_e = true
            this.ruleForm_f.id = row.id
            this.ruleForm_f.name = row.name
            this.ruleForm_f.desc = row.desc
        },
        updataItem() {
            this.temDialog_e = false
            this.temData.temTableData.map((x) => {
                if(x.id === this.ruleForm_f.id) {
                    x.name = this.ruleForm_f.name
                    x.desc = this.ruleForm_f.desc
                }
            })
        },
        handleNodeClick(data) {
            // console.log(data);
        },
        rightClick(event, data, node, obj) {
            this.showRightMenua = false
            this.showRightMenub = false
            this.showRightMenuc = false
            this.showRightMenud = false
            if(node.data.obj == 1) {
                 // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
                this.showRightMenua = true
                let menua = document.querySelector('#menua')
                menua.style.left = event.clientX + 'px'
                menua.style.top = event.clientY - 5 + 'px'
            } else if(node.data.obj == 2) {
                this.showRightMenub = true
                this.tempid = node
                let menub = document.querySelector('#menub')
                menub.style.left = event.clientX + 'px'
                menub.style.top = event.clientY - 5 + 'px'
            } else if(node.data.obj == 3) {
                this.showRightMenuc = true
                this.tempid = node
                let menuc = document.querySelector('#menuc')
                menuc.style.left = event.clientX + 'px'
                menuc.style.top = event.clientY - 5 + 'px'
            } else if(node.data.obj == 4) {
                this.showRightMenud = true
                this.tempid = node
                let menud = document.querySelector('#menud')
                menud.style.left = event.clientX + 'px'
                menud.style.top = event.clientY - 5 + 'px'
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
            this.showRightMenuc = false
            this.showRightMenud = false
            // 及时关掉鼠标监听事件
            document.removeEventListener('click', this.closeRightMenu)
        },
        //添加新模板--打开弹出框
        addDevHandle() {
            this.temDialog = true
        },
        //添加子系统--打开弹出框
        addSubSystemHandle() {
            this.temDialog_a = true
        },
        //添加装备--打开弹出框
        addequipmentHandle() {
            this.temDialog_b = true
        },
        editDevHandle() {
        },
        // 删除操作
        delDevHandle() {
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //新增问卷
        // id: '',
        //         name: '',
        //         user: '',
        //         role: '',
        //         cate: ''，date
        addQues() {
            this.temDialog = false
            let listTemp = {}
            listTemp.id = this.ruleForm_a.id
            listTemp.label = this.ruleForm_a.name
            listTemp.icon = 'el-icon-s-operation'
            listTemp.obj = 2
            if(this.ruleForm_a.cate === '0') {
                listTemp.children = []
            } else if(this.ruleForm_a.cate === '1') {
                listTemp.children = this.temListData
            }
            console.log(listTemp)
            let lens = this.data[0].children.push(listTemp)
            console.log(lens)
        },
        //添加子系统
        addSubSystem() {
            this.temDialog_a = false
            let listTemp = {}
            listTemp.id = this.ruleForm_b.id
            listTemp.label = this.ruleForm_b.name
            listTemp.icon = 'el-icon-s-operation'
            listTemp.obj = 2
            listTemp.children = []
            console.log(this.tempid)
            let lens = this.tempid.data.children.push(listTemp)
            console.log(lens)
        },
        //添加装备
        addequipment() {
            this.temDialog_b = false
            let listTemp = {}
            listTemp.id = this.ruleForm_c.id
            listTemp.label = this.ruleForm_c.name
            listTemp.icon = 'el-icon-s-claim'
            let lens = this.tempid.data.children.push(listTemp)
            console.log(lens)
        },
        //删除树的最后一级
        delNowItem() {
            console.log(this.tempid)
            this.showEmpty = true
            let i = 0
            this.tempid.parent.data.children.map((x) => {
                if(x.id === this.tempid.data.id) {
                    this.tempid.parent.data.children.splice(i,1)
                } else {
                    i++
                }
            })
        },
        //发布
        issueQues() {
            this.temDialog_d = true
        },
        toContent(node) {
            if(!node.data.hasOwnProperty('children') && node.data.id === 2) {
                this.showEmpty = false
            }
            console.log(node)
        },
        addEvaluationItem() {
            this.temDialog_c = true
        },
        deleteEvaluationItem() {

        },
        addEvaluation() {
            this.temDialog_c = false
            this.temData.temTableData.push(this.ruleForm_d)
        }
    }
}
</script>
<style lang="scss" scoped>
    .buttonRight {
        margin-right: 17%;
    }
    .buttomMargin {
        margin-left: 100px;
    }
    .icon {
        margin-right: 1px;
        vertical-align: middle;
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
        // text-align: center;
         .content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 90%;
            margin-top: 7px;
            box-sizing: border-box;
            .leftCon {
                width: 70%;       
                background-color: white;
                margin-left: 15px;
                box-sizing: border-box;
                .leftConHeader {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    .conButton {
                        box-sizing: border-box;
                        margin-left: 15px;
                        margin-top: 15px;
                        .buttonLeft {
                            margin-left: 15px;
                        }
                    }
                    .leftConHeaderRight {
                        box-sizing: border-box;
                        margin-right: 20px;
                        margin-top: 15px;
                        font-size: 13px;
                        color: $colorC;
                    }
                }
                .temTable {
                    box-sizing: border-box;
                    padding-left: 15px;
                    padding-right: 15px;
                    margin-top: 25px;
                    margin-bottom: 15px;
                    width: 100%;
                }
            }
            .temDesc {
                width: 25%;
                background-color: white;
                margin-right: 20px;
                box-sizing: border-box;
                padding-top: 20px;
                .temDescFooter {
                    width: 70%;
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                }
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
    .right-menu-height-small {
        height: 67px;
    }
    .right-menu-height-middle {
        height: 101px;
    }
    .right-menu-height-max {
        height: 135px;
    }
    .right-menu-height-min {
        height: 33px;
    }
    .right-menu {
      z-index: 1;
      position: absolute;
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
    
    .form {
        width: 90%;
    }
    .form_a {
        width: 80%;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
   
</style>


<template>
    <div class="make" v-loading = "!tableData.length">
        <div class="button clearfix">
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="buttonClass" @click="addSys">新建评估指标体系</el-button>
            <el-button type="primary" icon="el-icon-search" class="buttonClass" @click="querySys">指标体系查询</el-button>
            <el-button type="primary" icon="el-icon-tickets" class="buttonClass" @click="showSysTem">指标体系模板</el-button>
        </div>
        <div class="systemList">
            <el-table
                :data="tableDataNow"
                border
                style="width: 100%"
                ref="myTable"
            >
                <el-table-column
                    fixed
                    prop="id"
                    label="指标体系编号"
                    min-width="110"
                >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="name"
                    label="指标体系名称"
                    min-width="200"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="创建人员"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="说明"
                    min-width="180"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="300"
                    fixed="right"
                >
                    <template #default="scope">
                        <el-button @click="browseThis(scope.row)" type="text" size="small">浏览</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="deleteNow(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click="copy(scope.row)">复制</el-button>
                        <el-button type="text" size="small" @click="hold(scope.row)">保存至模板</el-button>
                    </template>
                </el-table-column>       
            </el-table>
        </div>
        <el-dialog
            title="指标体系查询"
            v-model="dialogVisible_a"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_a" ref="ruleForm_a" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="编号" prop="id" class="form">
                        <el-input v-model="ruleForm_a.id" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="模板名称" class="form" prop="name">
                        <el-input placeholder="请输入模板名称" v-model="ruleForm_a.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" class="form" prop="createTime">
                        <el-input placeholder="请输入创建时间" v-model="ruleForm_a.createTime"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间" class="form" prop="updateTime">
                        <el-input placeholder="请输入修改时间" v-model="ruleForm_a.updateTime"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人员" class="form" prop="user">
                        <el-input placeholder="请输入创建人员" v-model="ruleForm_a.user"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" class="form" prop="desc">
                        <el-input placeholder="请输入说明" v-model="ruleForm_a.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                 <el-button @click="resetForm('ruleForm_a')">重 置</el-button>
                <el-button type="primary" @click="query"  class="buttomMargin">查 询</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="指标体系查询结果"
            v-model="dialogVisible_b"
            width="90%"
            center
        >
            <div class="systemList listHeight">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    ref="myTableResult"
                    max-height="450"
                >
                    <el-table-column
                        fixed
                        prop="id"
                        label="指标体系编号"
                        min-width="110"
                    >
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="name"
                        label="指标体系名称"
                        min-width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="修改时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="user"
                        label="创建人员"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="desc"
                        label="说明"
                        min-width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="300"
                        fixed="right"
                    >
                        <template #default="scope">
                            <el-button @click="browseThis(scope.row)" type="text" size="small">浏览</el-button>
                            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteNow(scope.row)">删除</el-button>
                            <el-button type="text" size="small" @click="copy(scope.row)">复制</el-button>
                        </template>
                    </el-table-column>       
                </el-table>
            </div>
        </el-dialog>
        <el-dialog
            title="新建评估指标体系"
            v-model="dialogVisible_c"
            width="30%"
            center
        >
            <div class="note">
                <el-form :model="ruleForm_b" ref="ruleForm_b" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="体系编号" prop="id" class="form" required>
                        <el-input v-model="ruleForm_b.id" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="体系模板" prop="value" class="form" required>
                        <el-select v-model="ruleForm_b.value" placeholder="无">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="体系名称" class="form" prop="name" required>
                        <el-input placeholder="请输入名称" v-model="ruleForm_b.name"></el-input>
                    </el-form-item>
                    <el-form-item label="体系说明" class="form" prop="desc" required>
                        <el-input placeholder="请输入说明" v-model="ruleForm_b.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                 <el-button @click="resetForm('ruleForm_b')">重 置</el-button>
                <el-button type="primary" @click="addNewSys" class="buttomMargin">新 建</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="评估指标体系模板"
            v-model="dialogVisible_d"
            width="90%"
            center
        >
            <div class="systemList listHeight">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    ref="myTableResult"
                    max-height="450"
                >
                    <el-table-column
                        fixed
                        prop="id"
                        label="体系模板编号"
                        min-width="110"
                    >
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="name"
                        label="体系模板名称"
                        min-width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="修改时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="user"
                        label="创建人员"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="desc"
                        label="说明"
                        min-width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="300"
                        fixed="right"
                    >
                        <template #default="scope">
                            <el-button @click="browseThis(scope.row)" type="text" size="small">浏览</el-button>
                            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteNow(scope.row)">删除</el-button>
                            <el-button type="text" size="small" @click="copy(scope.row)">引用</el-button>
                        </template>
                    </el-table-column>       
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'make',
    data() {
        return {
            tableData: [
                {
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT202101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'Q01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'Q1',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'Q01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT1',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT201',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT01',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QXT201',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX2101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
                {
                    id: 'QX02101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QXT2101',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'QX1',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },{
                    id: 'Q',
                    name: '全系统评估指标体系2021',
                    createTime: '2020.10.10',
                    updateTime: '2020.10.10',
                    user: '李四',
                    desc: '全系统',
                },
            ],
            options: [
                {
                    value: '',
                    label: '无',
                },
                {
                    value: 'Option1',
                    label: '模板1',
                },
                {
                    value: 'Option2',
                    label: '模板2',
                },
                {
                    value: 'Option3',
                    label: '模板3',
                },
                {
                    value: 'Option4',
                    label: '模板4',
                },
            ],
            tableDataNow: [],
            currentPage: 1,
            pageSize: 15,
            totalPage: 0,
            dialogVisible_a: false,
            dialogVisible_b: false,
            dialogVisible_c: false,
            dialogVisible_d: false,
            ruleForm_a: {
                id: '',
                name: '',
                createTime: '',
                updateTime: '',
                user: '',
                desc: ''
            },
            ruleForm_b: {
                id: '',
                name: '',
                createTime: '',
                updateTime: '',
                user: '',
                desc: '',
                value: ''
            },
        }
    },
    created() {
        this.totalPage = this.tableData.length / this.pageSize
        this.loadData()
    },
    mounted() {
        // this.tableListener()
        document.addEventListener('scroll',this.scrollLoad)
    },
    methods: {
        showSysTem() {
            this.dialogVisible_d = true
            
        },
        addNewSys() {
            this.dialogVisible_c = false
            this.ruleForm_b.user = 'zyf'
            //TODO创建时间应为后台入库时间
            this.ruleForm_b.createTime = new Date()
            console.log(this.ruleForm_b)
        },
        scrollLoad(){
            let scrollHeight= document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
            let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
            let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
            if (nowScotop >= scrollHeight - wheight - 5 ) {
                if(this.currentPage < this.totalPage){
                    this.currentPage++
                    // this.getData(this.categoryId) //加载列表的请求方法
                    this.loadData()

                }
            }
        },
        loadData() {
            let data = this.tableData.slice((this.currentPage - 1) * this.pageSize,(this.currentPage - 1) * this.pageSize + this.pageSize)
            this.tableDataNow = this.tableDataNow.concat(data)
            console.log(this.currentPage)
        },
        tableListener() {
            let dom = document.querySelector(".el-table__body-wrapper")
            dom.addEventListener("scroll", () => {
                const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
                if (scrollDistance <= 0) {//等于0证明已经到底，可以请求接口
                    if (this.currentPage < this.totalPage) {//当前页数小于总页数就请求
                        this.loading = true
                        this.currentPage++;//当前页数自增
                        //请求接口的代码
                        this.loadData()
                    }
                }
            })
        },
        addSys() {
            this.dialogVisible_c = true
        },
        querySys() {
            this.dialogVisible_a = true
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        query() {
            //TODO axios
            this.dialogVisible_a = false
            this.dialogVisible_b = true
        },
        browseThis(row) {

        }
    }
}
</script>
<style lang="scss" scoped>
    .make {
        width: 100%;
        .button {
            width: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 100px;
            padding-right: 100px;
            .buttonClass {
                height: 40.4px;
            }
        }
        .systemList {
            width: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 100px;
            padding-right: 100px;
        }
        .listHeight {
            height: 450px;
            margin-bottom: 50px;
        }
        .buttomMargin {
            margin-left: 50px;
        }
        .form {
            width: 90%;
        }
    }
</style>

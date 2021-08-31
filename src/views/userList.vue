<template>
    <div class="userList"  v-loading = "!tableData.length">
        <el-table
            :data="tableData"
            border
            style="width: 100%"
        >
            <el-table-column
                fixed
                prop="id"
                label="Id"
                width="70"
            >
            </el-table-column>
            <el-table-column
                fixed
                prop="name"
                label="用户名称"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="role"
                label="用户角色"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="now"
                label="用户状态"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="desc"
                label="用户备注"
                width="636"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                width="100"
                fixed="right"
            >
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="isopen == 1">禁用</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small" v-else>启用</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="编辑"
            v-model="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户姓名" prop="name" class="name" required>
                        <el-input v-model="ruleForm.name" placeholder="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" required class="name" prop="pass">
                        <el-input placeholder="ruleForm.pass" v-model="ruleForm.pass" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色" prop="role" required>
                        <el-select v-model="ruleForm.role" placeholder="ruleForm.role">
                            <el-option label="系统操作人" value="operation"></el-option>
                            <el-option label="系统管理员" value="admin"></el-option>
                            <el-option label="系统评估专家" value="expert"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'user-list',
    data() {
        return {
            isopen: 1,
            dialogVisible: false,
            ruleForm: {
                name: '',
                role: '',
                pass: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请选择用户角色', trigger: 'blur' }
                ]
            },
            tableData: [{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            },{
                id: 1,
                name: '赵一凡',
                role: '管理员',
                now: '启用',
                desc: '超级管理员',
            }]
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        edit(row) {
            this.dialogVisible = true
            this.ruleForm.name = row.name
            this.ruleForm.role = row.role
            // this.ruleForm.pass = row.pass  todo:密码row里面没有
            console.log(this.ruleForm)
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        submitUser() {
            this.dialogVisible = false
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .userList {
        width: 100%;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 100px;
        padding-right: 100px;
        .name {
            width: 380px;
        }
    }
</style>

<template>
    <div class="adduser">
        <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户姓名" prop="name" class="name" required>
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" required class="name" prop="pass">
                    <el-input placeholder="请输入密码" v-model="ruleForm.pass" show-password></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role" required>
                    <el-select v-model="ruleForm.role" placeholder="请选择用户角色">
                        <el-option label="系统操作人" value="operation"></el-option>
                        <el-option label="系统管理员" value="admin"></el-option>
                        <el-option label="系统评估专家" value="expert"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="now" required>
                    <el-switch v-model="ruleForm.now" active-text="启用" inactive-text="禁用"></el-switch>
                </el-form-item>
                <el-form-item label="用户备注" prop="desc" class="name">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                
                <div class="buttonType">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="buttomMargin">立即创建</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    name: 'add-user',
    data() {
        return {
            aaaa: 1,
            ruleForm: {
                name: '',
                role: '',
                pass: '',
                desc: '',
                now: true
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
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.ruleForm)
                ElMessage.success({
                    message: '创建成功',
                    type: 'success'
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
    .adduser{
        padding-top: 20px;
        width: 100%;
        height: 100%;
        .content {
            box-sizing: border-box;
            padding-top: 20px;
            margin: 0 auto;
            width: 500px;
            height: 100%;
            .name {
                width: 500px;
            }
            .buttonType {
                margin-top: 50px;
                text-align: center;
                .buttomMargin {
                    margin-left: 50px;
                }
            }
        }
        
    }
</style>

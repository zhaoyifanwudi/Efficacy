<template>
    <div class="addTest">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <div class="content">
            <div v-show="active == 0">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">     
                    <el-form-item label="试验对象" prop="role" required class="name">
                        <el-select v-model="ruleForm.role" placeholder="请选择试验对象" class="name-content">
                            <el-option label="全系统" value="operation"></el-option>
                            <el-option label="枪械" value="admin"></el-option>
                            <el-option label="头盔" value="expert"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="试验目的" prop="obj" required class="name">
                        <el-select v-model="ruleForm.obj" placeholder="请选择试验目的" class="name-content">
                            <el-option label="携行稳定性评价" value="operation"></el-option>
                            <el-option label="疲劳耐受性评价" value="admin"></el-option>
                            <el-option label="可达性评价" value="expert"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="试验环境" prop="envir" required class="name">
                        <el-select v-model="ruleForm.envir" placeholder="请选择试验环境" class="name-content">
                            <el-option label="部队试验" value="operation"></el-option>
                            <el-option label="室外实验" value="admin"></el-option>
                            <el-option label="室内试验" value="expert"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active == 1">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">     
                    <el-form-item label="推荐试验设备" prop="equipment" class="name">
                        <el-input type="textarea" v-model="ruleForm.equipment"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐试验方法" prop="method" class="name">
                        <el-input type="textarea" v-model="ruleForm.method"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active == 2">
                <el-empty description="暂无数据"></el-empty>
            </div>
        </div>
        <div class="button">
            <el-button class="next prev" @click="prev" v-if="active == 1">上一步</el-button>
            <el-button class="next" @click="next" v-if="active == 0">下一步</el-button>
            <el-button class="next" @click="next" v-else-if="active == 1">生成</el-button>
            <el-button class="next" @click="next" v-else>导出</el-button> 
        </div>
    </div>
</template>
<script>
export default {
    name: 'add-test',
    data() {
        return {
            active: 0,
            ruleForm: {
                role: '',
                obj: '',
                envir: '',
                equipment: '',
                method: ''
            },
            rules: {
                role: [
                    { required: true, message: '请选择试验对象', trigger: 'blur' },
                ],
                obj: [
                    { required: true, message: '请选择试验目的', trigger: 'blur' },
                ],
                envir: [
                    { required: true, message: '请选择试验环境', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 0
        },
        prev() {
            this.active--
        }
    }
}
</script>
<style lang="scss" scoped>
    .addTest {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 100px;
        padding-right: 100px;
        .content {
            
            width: 500px;
            margin: 0 auto;
            padding-top: 50px;
            box-sizing: border-box;
            .name {
                width: 500px;
                .name-content {
                    width: 400px;
                }
            }
        }
        .button {
            margin: 55px auto;
            width: 200px;
            text-align: center;
            .next {
                display: inline-block;
                width: 84px;
                height: 40px;
            }
            .prev {
                margin-right: 10px;
            }
            
        }
    }
</style>

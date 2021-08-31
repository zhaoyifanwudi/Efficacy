<template>
    <div class="collection">
        <div class="header">
            <div class="header-con">
                <div class="testname">试验名称 :</div>
                <el-select v-model="formData.test" placeholder="请选择"  class="input">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="header-con">
                <div class="testname">试验地点 :</div>
                <el-input v-model="formData.place" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="header-con">
                <div class="testname">试验环境 :</div>
                <el-input v-model="formData.environment" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="header-con">
                <div class="testname">试验时间 :</div>
                <el-input v-model="formData.time" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="header-con">
                <div class="testname">试验人员 :</div>
                <el-input v-model="formData.people" placeholder="请输入内容" class="input"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'collection',
    data() {
        return {
            options: [
                {
                    value: '1',
                    label: '全系统'
                }, {
                    value: '2',
                    label: '头盔'
                }
            ],
            formData: {
                test: '',
                place: '',
                environment: '',
                time: '',
                people: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .collection {
        width: 100%;
        .header {
            width: 100%;
            padding-right: 40px;
            padding-left: 40px;
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .header-con {
                display: flex;
                align-items: center;
                .testname {
                    width: 70px;
                    font-size: 15px;
                    margin-right: 10px;
                    line-height: 40px;
                }
                .input {
                    width: 190px;
                }
            }
        }
    }
</style>

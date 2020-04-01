<template>
    <el-dialog :visible.sync="isVisible" :title="addFaultDialog.title" :close-on-click-modal='false'
        :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
        <div class="form">
            <el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth"
                style="margin:10px;width:auto;">
                <el-form-item label="故障ID:" prop="FaultParent">
                    <el-input type="text" v-model="form.FaultParent" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="form.FaultLabel" prop='FaultName'>
                    <el-input type="text" v-model="form.FaultName"></el-input>
                </el-form-item>
                <el-form-item prop='FaultDescription' label="故障描述:">
                    <el-input type="text" v-model="form.FaultDescription"></el-input>
                </el-form-item>
                <el-form-item class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import {
        addMoney,
        updateMoney
    } from "@/api/money";

    export default {
        name: 'addFault',
        data() {
            let validateData = (rule, value, callback) => {
                if (value === '') {
                    let text;
                    if (rule.field == "FaultParent") {
                        text = '故障ID';
                    } else if (rule.field == "FaultName") {
                        text = '故障名称';
                    } else {
                        text = '故障描述'
                    }
                    callback(new Error(text + '不能为空~'));
                } else {
                    let numReg = /^[0-9]+.?[0-9]*$/;
                    if (!numReg.test(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                isVisible: this.isShow,
                form: {
                    FaultParent: '',
                    FaultName: '',
                    FaultDescription: '',
                    FaultLabel: ''
                },
                form_rules: {
                    FaultParent: [{
                        required: true,
                        message: '故障ID不能为空！',
                        trigger: 'blur'
                    }],
                    FaultName: [{
                        required: true,
                        message: '故障名称不能为空！',
                        trigger: 'blur'
                    }, ],
                    FaultDescription: [{
                        required: true,
                        message: '故障描述不能为空！',
                        trigger: 'blur'
                    }, ],
                    accoutCash: [{
                        required: true,
                        validator: validateData,
                        trigger: 'blur'
                    }, ],
                },
                //详情弹框信息
                dialog: {
                    width: '400px',
                    formLabelWidth: '120px'
                }
            }
        },
        props: {
            isShow: Boolean,
            dialogRow: Object
        },
        computed: {
            ...mapGetters(['addFaultDialog']),

        },
        created() {
            console.log('a:'+this.addFaultDialog)
            if (this.addFaultDialog.type === 'add') {
                this.form = this.dialogRow;
            } else {
                if (this.$refs['form'] != undefined) {
                    this.$refs['form'].resetFields()
                }

            }

        },
        mounted() {
            console.log(this.isShow)
        },
        methods: {
            onScreeoutMoney() {

            },
            onAddMoney() {

            },
            closeDialog() {
                this.$emit('closeDialog');
            },
            //表单提交
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) { //表单数据验证完成之后，提交数据;
                        let formData = this[form];
                        const para = Object.assign({}, formData)
                        // edit
                        if (this.addFaultDialog.type === 'edit') {
                            console.log('2222222')
                            this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.isVisible = false
                                this.$emit('getFundList',formData);
                            // updateMoney(para).then(res => {
                            //     this.$message({
                            //         message: '修改成功',
                            //         type: 'success'
                            //     })
                            //     this.$refs['form'].resetFields()
                            //     this.isVisible = false
                            //     this.$emit('getFundList');
                            // })
                        } else {
                            // add
                            this.$post('/api/fault',para).then(res => {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.isVisible = false
                                this.$emit('getFaultTree');
                            })
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .search_container {
        margin-bottom: 20px;
    }

    .btnRight {
        float: right;
        margin-right: 0px !important;
    }

    .searchArea {
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        padding: 18px 18px 0;
    }
</style>
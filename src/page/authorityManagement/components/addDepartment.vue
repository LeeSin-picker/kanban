<template>
    <el-dialog :visible.sync="isVisible" :title="addFundDialog.title" :close-on-click-modal='false'
        :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
        <div class="form">
            <el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth"
                style="margin:10px;width:auto;">
                <el-form-item prop='Name' label="部门名称:">
                    <el-input type="text" v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item prop='HigherDepartment' label="上级部门名称:">
                    <el-input type="text" v-model="form.HigherDepartment"></el-input>
                </el-form-item>
                <el-form-item prop='LeaderName' label="部门负责人:">
                    <el-input type="text" v-model="form.LeaderName"></el-input>
                </el-form-item>
                <el-form-item prop='PhoneNumber' label="部门联系电话:">
                    <el-input type="text" v-model="form.PhoneNumber"></el-input>
                </el-form-item>
                <el-form-item prop='EmailAddress' label="部门邮箱:">
                    <el-input type="text" v-model="form.EmailAddress"></el-input>
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
    export default {
        name: 'addDepartment',
        data() {
            let validateData = (rule, value, callback) => {
                if (value === '') {
                    let text;
                    if (rule.field == "HigherDepartment") {
                        text = '上级部门名称';
                    } else if (rule.field == "Name") {
                        text = '部门名称';
                    } else {
                        text = '';
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
                    Name: '',
                    HigherDepartment: '',
                    LeaderName: '',
                    PhoneNumber:'',
                    EmailAddress:'',
                },
                roleList: [],
                departmentList: [],
                form_rules: {
                    Name: [{
                        required: true,
                        message: '部门名称不能为空！',
                        trigger: 'blur'
                    }],
                    HigherDepartment: [{
                            required: true,
                            message: '上级部门名称不能为空！',
                            trigger: 'blur'
                        },
                        // 开启数字校验
                        // { required: true, validator:validateData,trigger: 'blur'},
                    ],
                    LeaderName: [{
                        required: true,
                        message: '部门负责人不能为空！',
                        trigger: 'blur'
                    }, ],
                },
                //详情弹框信息
                dialog: {
                    width: '400px',
                    formLabelWidth: '120px'
                },
                RoleId:['a','b'],
                DepID:[]
            }
        },
        props: {
            isShow: Boolean,
            dialogRow: Object
        },
        computed: {
            ...mapGetters(['addFundDialog']),

        },
        created() {
            console.log('b'+this.addFundDialog)
            if (this.addFundDialog.type === 'edit') {
                this.form = this.dialogRow;
            } else {
                if (this.$refs['form'] != undefined) {
                    this.$refs['form'].resetFields()
                }

            }
            this.$get('/api/department',{})
            .then(res=>{
                this.departmentList = res.data.data
            })
            this.$get('/api/role',{})
            .then(res=>{
                this.roleList = res.data.data
                console.log(this.roleList)
            })

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
                        console.log(para)
                        // edit
                        if (this.addFundDialog.type === 'edit') {
                            this.$post('/api/users',para).then(res => {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.isVisible = false
                                this.$emit('getUsersTable');
                            })
                        } else {
                            // add
                            this.$post('/api/users',para).then(res => {
                                console.log(res.data)
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                                this.$refs['form'].resetFields()
                                this.isVisible = false
                                this.$emit('getUsersTable');
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
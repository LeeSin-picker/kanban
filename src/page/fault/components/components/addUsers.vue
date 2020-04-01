<template>
    <el-dialog :visible.sync="isVisible" :title="addFundDialog.title" :close-on-click-modal='false'
        :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
        <div class="form">
            <el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth"
                style="margin:10px;width:auto;">
                <el-form-item label="角色名:" prop='RoleId'>
                    <el-select v-model="form.RoleId" placeholder="角色名">
                        <el-option
                            v-for="item in roleList"
                            :key="item.RoleName"
                            :label="item.RoleName"
                            :value="item.RoleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='UserName' label="用户名:">
                    <el-input type="text" v-model="form.UserName"></el-input>
                </el-form-item>
                <el-form-item prop='UserCard' label="工号:">
                    <el-input type="text" v-model="form.UserCard"></el-input>
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
        name: 'addUsers',
        data() {
            let validateData = (rule, value, callback) => {
                if (value === '') {
                    let text;
                    if (rule.field == "RoleName") {
                        text = '角色名';
                    } else if (rule.field == "UserName") {
                        text = '用户名';
                    } else {
                        text = '工号';
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
                    RoleName: '',
                    UserName: '',
                    UserCard: ''
                },
                roleList: [],
                form_rules: {
                    RoleId: [{
                        required: true,
                        message: '角色名不能为空！',
                        trigger: 'blur'
                    }],
                    UserName: [{
                            required: true,
                            message: '用户名不能为空！',
                            trigger: 'blur'
                        },
                        // 开启数字校验
                        // { required: true, validator:validateData,trigger: 'blur'},
                    ],
                    UserCard: [{
                        required: true,
                        message: '工号不能为空！',
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
            ...mapGetters(['addFundDialog']),

        },
        created() {
            console.log('b'+this.addFundDialog)
            if (this.addFundDialog.type === 'edit') {
                this.form = this.dialogRow;
                console.log(this.isVisible)
            } else {
                if (this.$refs['form'] != undefined) {
                    this.$refs['form'].resetFields()
                }

            }
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
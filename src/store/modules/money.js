import {
    getMoneyIncomePay
} from '@/api/money' // 导入资金信息相关接口

const money = {
    state: {
        addFundDialog: {
            title: '新增用户信息',
            type: 'add'
        },
        addFaultDialog: {
            title: '新增故障信息',
            type: 'add'
        },
        search: {
            startTime: '',
            endTime: '',
            name: ''
        },
        searchBtnDisabled: true,
        tagFlag: false
    },
    getters: {
        addFundDialog: state => state.addFundDialog,
        addFaultDialog: state => state.addFaultDialog,
        search: state => state.search,
        searchBtnDisabled: state => state.searchBtnDisabled,
        tagFlag: state => state.tagFlag
    },
    mutations: {
        SET_DIALOG_TITLE: (state, type) => {
            if (type === 'add') {
                state.addFundDialog.title = '新增'
                state.addFundDialog.type = 'add'
            } else {
                state.addFundDialog.title = '编辑'
                state.addFundDialog.type = 'edit'
            }
        },
        SET_FAULT_TITLE: (state, type) => {
            if (type === 'add') {
                state.addFaultDialog.title = '新增故障信息'
                state.addFaultDialog.type = 'add'
            } else {
                state.addFaultDialog.title = '编辑故障信息'
                state.addFaultDialog.type = 'edit'
            }
        },
        SET_SEARCH: (state, payload) => {
            state.search = payload;
        },
        SET_SEARCHBTN_DISABLED: (state, payload) => {
            state.searchBtnDisabled = payload;
        },
        SET_TAGS_FLAG: (state, flag) => {
            console.log(flag)
            state.tagFlag = flag
        }
    },
    actions: {
        // 获取资金列表
        GetMoneyIncomePay({
            commit
        }, reqData) {
            return new Promise(resolve => {
                getMoneyIncomePay(reqData).then(response => {
                    const data = response.data
                    resolve(data)
                })
            })
        }


    }
}

export default money
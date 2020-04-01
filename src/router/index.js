import Vue from 'vue'
import Router from 'vue-router'
import {
    Layout,
    Content
} from "../layout"; // 页面整体布局
import {
    topRouterMap
} from "./topRouter";

Vue.use(Router)

function filterTopRouterMap(name) {
    let router = topRouterMap.find((item) => {
        return item.parentName === name;
    });
    return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = [
    '/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [{
        path: '',
        component: Layout,
        redirect: '/kanban/indexPage',
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import('@/page/login'),
        hidden: true
    },
    {
        path: '/ppKanban',
        name: 'ppKanban',
        component: () =>
            import('@/page/kanban/projectProgressKanban'),
        hidden: true,
        meta: {
            title: '项目进度看板',
            icon: 'fa-area-chart',
        }
    },
    {
        path: '/adaptationKanban',
        name: 'adaptationKanban',
        component: () =>
            import('@/page/kanban/TVKanban'),
        hidden: true,
        meta: {
            title: '电视看板',
            icon: 'fa-area-chart',
        }
    }
]

//注册路由
export default new Router({
    // mode: 'history', //后端支持可开
    routes: constantRouterMap
})
//异步路由（需要权限的页面）
export const asyncRouterMap = [{
        path: '/kanban',
        name: 'kanban',
        component: Layout,
        meta: {
            title: '看板',
            icon: 'fa-area-chart',
        },
        hidden: true,
        children: [{
                path: 'indexPage',
                name: 'indexPage',
                meta: {
                    // title: '主页',
                    icon: 'fa-asterisk',
                    routerType: 'leftmenu'
                },
                component: () =>
                    import('@/page/kanban/projectProgressKanban'),
            },
            {
                path: 'projectProgressKanban',
                name: 'projectProgressKanban',
                meta: {
                    title: '项目进度看板',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/kanban/projectProgressKanban'),
            },
            {
                path: 'TVKanban',
                name: 'TVKanban',
                meta: {
                    title: '电视看板',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/kanban/TVKanban'),
            }
        ]
    },
    // 项目管理
    {
        path: '/projectManagement',
        name: 'projectManagement',
        meta: {
            title: '项目管理',
            icon: 'fa-file-text',
        },
        component: Layout,
        hidden: true,
        children: [{
                path: 'projectMaintenance',
                name: 'projectMaintenance',
                meta: {
                    title: '项目维护',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/projectManagement/projectMaintenance'),
            },
            {
                path: 'projectProgress',
                name: 'projectProgress',
                meta: {
                    title: '进度维护',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/projectManagement/projectProgress'),
            }
        ]
    },
    // // ERP订单管理
    // {
    //     path: '/ERPOrderManagement',
    //     name: 'ERPOrderManagement',
    //     component: Layout,
    //     meta: {
    //         title: 'ERP订单管理',
    //         icon: 'fa-th',
    //     },
    //     noDropdown: true,
    //     children: [{
    //         path: '',
    //         meta: {
    //             title: 'ERP订单管理',
    //             icon: 'fa-area-chart',
    //             routerType: 'leftmenu'
    //         },
    //         component: () =>
    //             import('@/page/ERPOrderManagement'),
    //     }]
    // },
    // // 订单管理
    // {
    //     path: '/orderManagement',
    //     name: 'orderManagement',
    //     meta: {
    //         title: '订单管理',
    //         icon: 'fa-file-text',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'orderManagement',
    //             name: 'orderManagement',
    //             meta: {
    //                 title: '订单管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/orderManagement/orderManagement'),
    //         },
    //         {
    //             path: 'orderTracking',
    //             name: 'orderTracking',
    //             meta: {
    //                 title: '订单查询',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/orderManagement/orderTracking'),
    //         },
    //         {
    //             path: 'proAbnormalOrder',
    //             name: 'proAbnormalOrder',
    //             meta: {
    //                 title: '生产异常订单',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/orderManagement/proAbnormalOrder'),
    //         },
    //         {
    //             path: 'retroactiveManagement',
    //             name: 'retroactiveManagement',
    //             meta: {
    //                 title: '追溯管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/orderManagement/retroactiveManagement'),
    //         }
    //     ]
    // },
    // // 排产管理
    // {
    //     path: '/schedulingManagement',
    //     name: 'schedulingManagement',
    //     meta: {
    //         title: '排产管理',
    //         icon: 'fa-dedent',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'schedulingManagement',
    //             name: 'schedulingManagement',
    //             meta: {
    //                 title: '排产管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/schedulingManagement/schedulingManagement'),
    //         },
    //         {
    //             path: 'historicalScheduling',
    //             name: 'historicalScheduling',
    //             meta: {
    //                 title: '历史排产记录查询',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/schedulingManagement/historicalScheduling'),
    //         },
    //         {
    //             path: 'historicalPrefab',
    //             name: 'historicalPrefab',
    //             meta: {
    //                 title: '历史预制件计划记录查询',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/schedulingManagement/historicalPrefab'),
    //         }
    //     ]
    // },
    // // 任务管理
    // {
    //     path: '/taskManagement',
    //     name: 'taskManagement',
    //     meta: {
    //         title: '任务管理',
    //         icon: 'fa-tasks',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'taskManagement',
    //             name: 'taskManagement',
    //             meta: {
    //                 title: '任务管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/taskManagement/taskManagement'),
    //         },
    //         {
    //             path: 'taskStatus',
    //             name: 'taskStatus',
    //             meta: {
    //                 title: '任务状态',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/taskManagement/taskStatus'),
    //         },
    //         {
    //             path: 'historicalTask',
    //             name: 'historicalTask',
    //             meta: {
    //                 title: '历史任务记录查询',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/taskManagement/historicalTask'),
    //         }
    //     ]
    // },
    // // 运维管理
    // {
    //     path: '/operationsManagement',
    //     name: 'operationsManagement',
    //     meta: {
    //         title: '运维管理',
    //         icon: 'fa-wrench',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'equipmentCheck',
    //             name: 'equipmentCheck',
    //             meta: {
    //                 title: '设备点检',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/equipmentCheck'),
    //         },
    //         {
    //             path: 'inspectionPlanMag',
    //             name: 'inspectionPlanMag',
    //             meta: {
    //                 title: '点检计划管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/inspectionPlanMag'),
    //         },
    //         {
    //             path: 'equipmentCheckMag',
    //             name: 'equipmentCheckMag',
    //             meta: {
    //                 title: '设备点检项管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/equipmentCheckMag'),
    //         },
    //         {
    //             path: 'checkingTiming',
    //             name: 'checkingTiming',
    //             meta: {
    //                 title: '点检定时计划配置',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/checkingTiming'),
    //         },
    //         {
    //             path: 'timingPlan',
    //             name: 'timingPlan',
    //             meta: {
    //                 title: '定时计划特殊时间配置',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/timingPlan'),
    //         },
    //         {
    //             path: 'checkPlanHistory',
    //             name: 'checkPlanHistory',
    //             meta: {
    //                 title: '点检计划历史记录',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/checkPlanHistory'),
    //         },
    //         {
    //             path: 'operationGroupType',
    //             name: 'operationGroupType',
    //             meta: {
    //                 title: '运维组类型管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/operationGroupType'),
    //         },
    //         {
    //             path: 'operationGroupMag',
    //             name: 'operationGroupMag',
    //             meta: {
    //                 title: '运维组管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/operationGroupMag'),
    //         },
    //         {
    //             path: 'operationTeam',
    //             name: 'operationTeam',
    //             meta: {
    //                 title: '运维组成员管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/operationTeam'),
    //         },
    //         {
    //             path: 'operationRoles',
    //             name: 'operationRoles',
    //             meta: {
    //                 title: '运维组成员角色管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/operationsManagement/operationRoles'),
    //         }
    //     ]
    // },
    // // 设备管理
    // {
    //     path: '/equipmentManagement',
    //     name: 'equipmentManagement',
    //     meta: {
    //         title: '设备管理',
    //         icon: 'fa-cog',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'baseType',
    //             name: 'baseType',
    //             meta: {
    //                 title: '设备基础类型管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/baseType'),
    //         },
    //         {
    //             path: 'deviceType',
    //             name: 'deviceType',
    //             meta: {
    //                 title: '设备类型管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/deviceType'),
    //         },
    //         {
    //             path: 'productionLine',
    //             name: 'productionLine',
    //             meta: {
    //                 title: '产线管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/productionLine'),
    //         },
    //         {
    //             path: 'processEquipment',
    //             name: 'processEquipment',
    //             meta: {
    //                 title: '工序设备管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/processEquipment'),
    //         },
    //         {
    //             path: 'stationManagement',
    //             name: 'stationManagement',
    //             meta: {
    //                 title: '工站管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/stationManagement'),
    //         },
    //         {
    //             path: 'basicEquipment',
    //             name: 'basicEquipment',
    //             meta: {
    //                 title: '基础设备管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/basicEquipment'),
    //         },
    //         {
    //             path: 'equipmentStatus',
    //             name: 'equipmentStatus',
    //             meta: {
    //                 title: '设备状态管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/equipmentManagement/equipmentStatus'),
    //         }
    //     ]
    // },
    // // 产品管理
    // {
    //     path: '/productManagement',
    //     name: 'productManagement',
    //     meta: {
    //         title: '产品管理',
    //         icon: 'fa-cubes',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'baseType',
    //             name: 'baseType',
    //             meta: {
    //                 title: '产品基础类型管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/baseType'),
    //         },
    //         {
    //             path: 'productType',
    //             name: 'productType',
    //             meta: {
    //                 title: '产品类型管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/productType'),
    //         },
    //         {
    //             path: 'productNumber',
    //             name: 'productNumber',
    //             meta: {
    //                 title: '产品型号管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/productNumber'),
    //         },
    //         {
    //             path: 'productManagement',
    //             name: 'productManagement',
    //             meta: {
    //                 title: '产品管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/productManagement'),
    //         },
    //         {
    //             path: 'productBOM',
    //             name: 'productBOM',
    //             meta: {
    //                 title: '产品bom管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/productBOM'),
    //         },
    //         {
    //             path: 'productProperties',
    //             name: 'productProperties',
    //             meta: {
    //                 title: '产品属性管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/productProperties'),
    //         },
    //         {
    //             path: 'propertyConfig',
    //             name: 'propertyConfig',
    //             meta: {
    //                 title: '产品属性配置管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/propertyConfig'),
    //         },
    //         {
    //             path: 'attributeVal',
    //             name: 'attributeVal',
    //             meta: {
    //                 title: '产品属性值管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/productManagement/attributeVal'),
    //         }
    //     ]
    // },
    // // 故障管理
    // {
    //     path: '/faultManagement',
    //     name: 'faultManagement',
    //     meta: {
    //         title: '故障管理',
    //         icon: 'fa-exclamation-triangle',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'faultCoding',
    //             name: 'faultCoding',
    //             meta: {
    //                 title: '故障编码',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/faultManagement/faultCoding'),
    //         },
    //         {
    //             path: 'brokenRecord',
    //             name: 'brokenRecord',
    //             meta: {
    //                 title: '故障记录',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/faultManagement/brokenRecord'),
    //         },
    //         {
    //             path: 'troubleshootingResults',
    //             name: 'troubleshootingResults',
    //             meta: {
    //                 title: '故障处理结果',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/faultManagement/troubleshootingResults'),
    //         },
    //         {
    //             path: 'faultType',
    //             name: 'faultType',
    //             meta: {
    //                 title: '故障类型',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/faultManagement/faultType'),
    //         }
    //     ]
    // },
    // // 工艺管理
    // {
    //     path: '/technologyManagement',
    //     name: 'technologyManagement',
    //     meta: {
    //         title: '工艺管理',
    //         icon: 'fa-book',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'technologyManagement',
    //             name: 'technologyManagement',
    //             meta: {
    //                 title: '工艺管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/technologyManagement/technologyManagement'),
    //         },
    //         {
    //             path: 'processManagement',
    //             name: 'processManagement',
    //             meta: {
    //                 title: '流程管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/technologyManagement/processManagement'),
    //         },
    //         {
    //             path: 'process',
    //             name: 'process',
    //             meta: {
    //                 title: '流程工序管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/technologyManagement/process'),
    //         },
    //         {
    //             path: 'basicProcess',
    //             name: 'basicProcess',
    //             meta: {
    //                 title: '基础工序管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/technologyManagement/basicProcess'),
    //         }
    //     ]
    // },
    // // 消息管理
    // {
    //     path: '/messageManagement',
    //     name: 'messageManagement',
    //     meta: {
    //         title: '消息管理',
    //         icon: 'fa-commenting-o',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'systemInfor',
    //             name: 'systemInfor',
    //             meta: {
    //                 title: '系统消息管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/messageManagement/systemInfor'),
    //         },
    //         {
    //             path: 'personalMessage',
    //             name: 'personalMessage',
    //             meta: {
    //                 title: '个人消息管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/messageManagement/personalMessage'),
    //         },
    //         {
    //             path: 'newsSubscription',
    //             name: 'newsSubscription',
    //             meta: {
    //                 title: '消息订阅管理',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/messageManagement/newsSubscription'),
    //         },
    //         {
    //             path: 'messagePush',
    //             name: 'messagePush',
    //             meta: {
    //                 title: '消息推送记录',
    //                 icon: 'fa-asterisk',
    //                 routerType: 'leftmenu'
    //             },
    //             component: () =>
    //                 import('@/page/messageManagement/messagePush'),
    //         }
    //     ]
    // },
    // 权限管理
    {
        path: '/authorityManagement',
        name: 'authorityManagement',
        meta: {
            title: '权限管理',
            icon: 'fa-users',
        },
        hidden: true,
        component: Layout,
        children: [{
                path: 'userManagement',
                name: 'userManagement',
                meta: {
                    title: '用户管理',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/authorityManagement/userManagement'),
            },
            {
                path: 'roleManagement',
                name: 'roleManagement',
                meta: {
                    title: '角色管理',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () =>
                    import('@/page/authorityManagement/roleManagement'),
            },
            // {
            //     path: 'departmentManagement',
            //     name: 'departmentManagement',
            //     meta: {
            //         title: '部门管理',
            //         icon: 'fa-asterisk',
            //         routerType: 'topmenu'
            //     },
            //     component: () =>
            //         import('@/page/authorityManagement/departmentManagement'),
            // }
        ]
    },
    {
        path: '/infoManage',
        name: 'infoManage',
        meta: {
            title: '信息管理',
            icon: 'fa-asterisk',
        },
        hidden: false,
        component: Layout,
        children: [{
            path: 'infoModify',
            name: 'infoModify',
            meta: {
                title: '修改密码',
                icon: 'fa-asterisk',
                routerType: 'leftmenu'
            },
            component: () =>
                import('@/page/infoManage/infoModify'),
        }]
    },
    {
        path: '*',
        redirect: '/kanban/kanban',
        hidden: true
    }
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 *
 *
 *
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 *
 *
 *
 */
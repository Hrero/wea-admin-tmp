import { FilterType } from '../../ng-component/zgl-type/filter.type';

export const orderListFilter: FilterType[] = [
    {
        label: '订单状态',
        type: 'select',
        key: 'orderStatus',
        placeholder: '订单状态',
        optionList: [
            {value: "1", name: "待支付"},
            {value: "11", name: "待审核"},
            {value: "23", name: "待授权"},
            {value: "30", name: "待签署"},
            {value: "2", name: "待配货"},
            {value: "3", name: "待配送"},
            {value: "4", name: "待签收"},
            {value: "5", name: "租赁中"},
            {value: "6", name: "待回收"},
            {value: "14", name: "待结算"},
            {value: "7", name: "已完结"},
            {value: "8", name: "已关闭"},
            {value: "12", name: "审核不通过"},
        ],
    },{
        label: '所属团队',
        type: 'select',
        key: 'deptId', // departmentId
        placeholder: '所属团队',
        sourceKey: 'departmentList',
        optionList: [],
    },{
        label: '订单归属',
        type: 'select',
        key: 'salesId', //orderBelongTo
        placeholder: '订单归属',
        sourceKey: 'salesmanList',
        optionList: [],
    },
    {
        label: '客户归属',
        type: 'select',
        key: 'salesId2', // customerBelongTo
        placeholder: '客户归属',
        sourceKey: 'salesmanList',
        optionList: [],
    },
    {
        label: '时间',
        type: 'time',
        key: 'date',
        placeholder: '客户归属',
        optionList: [],
    },
    { label: '客户名称', key: 'searchName', type: 'text', placeholder: '请输入订单号/客户手机号码/客户名称' },
];

export const visitListFilter: FilterType[] = [
    {
        label: '认证类型',
        type: 'select',
        key: 'authType',
        sourceKey: 'AuthTypeEnum',
        placeholder: '认证类型',
        optionList: [],
    },
    {
        label: '客户等级',
        type: 'select',
        key: 'level',
        placeholder: '客户等级',
        // sourceKey: 'CustomerLevelEnum',
        optionList: [
            {name: "0", value: "_0"},
            {name: "A", value: "A"},
            {name: "B", value: "B"},
            {name: "C", value: "C"},
            {name: "D", value: "D"},
            {name: "S", value: "S"}
        ],
    },
    {
        label: '客户标签',
        type: 'select',
        key: 'tag',
        placeholder: '客户标签',
        sourceKey: 'CustomerTagEnum',
        optionList: [],
    },
    {
        label: '数据分类',
        type: 'select',
        key: 'quitStatus',
        placeholder: '数据分类',
        optionList: [
            {name: "常规数据", value: "1"},
            {name: "销售离职", value: "-1"},
        ],
    },
    {
        label: '所属团队',
        type: 'select',
        key: 'deptId',
        placeholder: '团队',
        sourceKey: 'departmentList',
        optionList: [],
    },
    { label: '客户名称', key: 'name', type: 'text', placeholder: '请输入客户名称' },
];


import { FilterType } from '../../ng-component/zgl-type/filter.type';

export const privateseasFilter: FilterType[] = [
    {
        label: '认证类型',
        type: 'select',
        key: 'authType',
        sourceKey: 'AuthTypeEnum',
        placeholder: '认证类型',
        optionList: [],
    },{
        label: '客户等级',
        type: 'select',
        key: 'level',
        placeholder: '客户等级',
        optionList: [
            {name: "0", value: "_0"},
            {name: "A", value: "A"},
            {name: "B", value: "B"},
            {name: "C", value: "C"},
            {name: "D", value: "D"},
            {name: "S", value: "S"}
        ],
    },{
        label: '所属团队',
        type: 'select',
        key: 'deptId',
        placeholder: '团队',
        sourceKey: 'departmentList',
        optionList: [],
    },{
        label: '所属销售',
        type: 'select',
        key: 'salesId',
        placeholder: '销售',
        sourceKey: 'salesmanList',
        optionList: [],
    },{
        label: '客户状态',
        type: 'select',
        key: 'status',
        placeholder: '客户状态',
        optionList: [
            { name: '新增', value: 'NEW_ADD' },
            { name: '拜访', value: 'VISIT' },
            { name: '新签', value: 'SIGN_UP' },
            { name: '续签', value: 'RENEW' },
        ],
    },
    { label: '客户名称', key: 'name', type: 'text', placeholder: '请输入客户名称' },
];


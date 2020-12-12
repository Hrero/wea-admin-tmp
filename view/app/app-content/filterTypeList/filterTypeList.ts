import { FilterType } from '../../ng-component/zgl-type/filter.type';

export const groupseasFilter: FilterType[] = [
    {
        label: '认证类型',
        type: 'select',
        key: 'authType',
        sourceKey: 'AuthTypeEnum',
        placeholder: '认证类型',
        optionList: [],
    },
    {
        label: '所属行业',
        type: 'select',
        key: 'industry',
        placeholder: '所属行业',
        sourceKey: 'CustomerIndustryEnum',
        optionList: [],
    },
    {
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
        label: '来源',
        type: 'cascader',
        key: 'source',
        sourceKey: 'CustomerSourceEnum',
        placeholder: '来源',
        optionList: [],
    },
    
    { label: '客户名称', key: 'name', type: 'text', placeholder: '请输入客户名称' },
];

export const teamseasFilter: FilterType[] = [
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


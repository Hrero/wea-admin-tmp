export interface FilterType {
    key: string; // 输入项对应的key值
    keys?: string; // 数字区间等例如输入为  1~100
    label: string; // 输入项中文名称
    placeholder?: string; // type为 select、text、area时的输入框提示信息
    placeholders?: string; // 存在keys时 作为第2个输入框的提示
    type: string;
    // 'select' | 'text' | 'area' | 'codemirror' | 'file' | 'number' | 'show' | 'range' | 'date' | 'cascader'
    // | 'teamAndSale' | 'radio' | 'time' | 'image' | 'hidden';
    // 目前支持 select text area codemirror file number show range, type为show时只读展示 type为range时 第2个key使用keys
    areaRow?: number; // type为area时，行数
    mode?: string;
    sourceKey?: string; // type为select时，如果有该值，请求对应filterService的接口获取select列表，优先级高于optionList
    optionList?: Array<any>;  // type 为select时，预设的选择列表 {name, value}
    isLoading?: boolean;  // 远程获取数据时是否开启加载状态
    default?: any;  // 默认值
    required?: boolean; // 标记是否必须
    search?: boolean; // 允许输入框输入快速筛选选择
    dataType?: string;
    // 当type为file时需要 sign为单一图片 空为多张图片 json 为 json化[],join为多图逗号隔开 'file' | 'json' | 'join' | 'sign' | ''
    // 当使用批量功能时，为单一请求的数据类型： text, number, json, day, month, long, boolean
    min?: number;  // type为number 时选填，可输入最小值
    max?: number;  // type为number 时选填，可输入数字最大值
    step?: number; // type为number 时选填，点击阶梯按钮增加或减小
    tips?: string; // type为number 时，对应输入框的提示
    hidden?: boolean; // 控制是否展示
    format?: string; // type为date时 时间提交格式， type为cascader时值为string
    timeDisabled?: boolean; // type为date时 时间是否不限制
    nzMode?: 'multiple' | 'tags' | 'default'; // 'multiple' | 'tags' | 'default'
    needChoose?: boolean; // 批量功能专属
}

// zgl-forms 和 zgl-filter 表单格式 需要其他输入方式可另行添加

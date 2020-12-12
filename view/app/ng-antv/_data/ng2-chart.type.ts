export interface Ng2ChartType {
    type: string; // 类型
    list: Array<any>; // 数组
    keyX: string; // X轴
    keyWord?: string;
    count: string; // 数值
    width?: number; // 图表宽度
    height?: number; // 图表高度
    function?: any; // Y轴数值
    percent?: any; // 百分比
}

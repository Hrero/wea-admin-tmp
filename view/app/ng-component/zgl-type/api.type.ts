export interface ApiType {
    url: string;
    btnName?: string;
    btnType?: string;
    server?: string;
    method?: string;
    warning?: string;
    ctrl?: Array<any>;
    disabled?: boolean;
}
export interface NeedConfirmType {
    name: string;
    key: string;
}

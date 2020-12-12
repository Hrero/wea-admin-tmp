export class NzCheckTable {
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    listOfDisplayData = [];
    listOfAllData = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    numberOfChecked = 0;
    pageIndex = 1;
    pageSize = 20;
    total: number;
    loading = false;
    private keyId;

    refreshStatus(keyId: string): void {
        if (!this.listOfDisplayData.length) {
            return;
        }
        this.isAllDisplayDataChecked = this.listOfDisplayData
            .filter(item => !item.disabled)
            .every(item => this.mapOfCheckedId[item[keyId]]);
        this.isIndeterminate = this.listOfDisplayData
                .filter(item => !item.disabled)
                .some(item => this.mapOfCheckedId[item[keyId]])
            && !this.isAllDisplayDataChecked;
        this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item[keyId]]).length;
    }

    checkAll(value: boolean, keyId: string): void {
        this.listOfDisplayData
            .filter(item => !item.disabled)
            .forEach(item => (this.mapOfCheckedId[item[keyId]] = value));
        this.refreshStatus(keyId);
    }

    getCanCheckList(e: Array<any>, keyId: string): void {
        this.keyId = keyId;
        this.listOfDisplayData = e;
        this.refreshStatus(keyId);
    }

    operateData(keyId: string) {
        return this.listOfAllData.filter(item => this.mapOfCheckedId[item[keyId]]);
    }


}

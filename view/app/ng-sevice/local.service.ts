import {Injectable} from '@angular/core';
import { LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    constructor(
        private ls: LocalStorageService,
        private ss: SessionStorageService
    ) {}

    getLocal(key) {
        return this.ls.retrieve(key);
    }

    setLocal(key: string, value: any) {
        this.ls.store(key, value);
    }

    clearLoacl(key) {
        this.ls.clear(key);
    }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-image-view',
    templateUrl: './app-view-image.component.html',
    styleUrls: ['./app-view-image.component.less']
})
export class AppImgViewComponent implements OnInit {

    public imgShow: Array<any>;

    @Input() imageInfo;

    constructor() {
    }

    ngOnInit() {
        if (typeof this.imageInfo === 'string') {
            try {
                this.imgShow = JSON.parse(this.imageInfo);
            } catch (e) {
                const arr = this.imageInfo.replace(/\[/g, '').replace(/\]/g, '').split(',');
                this.imgShow = [...arr];
            }
        }
        if (Array.isArray(this.imageInfo)) {
            this.imgShow = [...this.imageInfo];
        }
    }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NzAffixModule,
    NzAutocompleteModule,
    NzBackTopModule,
    NzBreadCrumbModule,
    NzButtonModule, NzCardModule, NzCarouselModule,
    NzCascaderModule,
    NzCheckboxModule, NzCollapseModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzDrawerModule,
    NzDropDownModule, NzEmptyModule, NzFormModule,
    NzPopconfirmModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule, NzListModule,
    NzMenuModule, NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzPaginationModule, NzPopoverModule, NzRadioModule,
    NzSelectModule,
    NzSkeletonModule, NzSliderModule,
    NzSpinModule,
    NzStatisticModule,
    NzStepsModule, NzSwitchModule,
    NzTableModule,
    NzTabsModule, NzTagModule,
    NzTimelineModule,
    NzToolTipModule, NzTreeSelectModule, NzUploadModule
} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {QRCodeModule} from 'angularx-qrcode';
import {NgxBarcode6Module} from 'ngx-barcode6';
import {AppMenuComponent} from './app-menu/app-menu.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {ZglFilterComponent} from './zgl-filter/zgl-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoIconComponent } from './app-icon/logo-icon/logo-icon.component';
import {ZglFormsComponent} from './zgl-forms/zgl-forms.component';
import { ExtattrDescPipe } from './ng-pipe/extattr-desc.pipe';
import { CustomerStatusNumPipe } from './ng-pipe/customer-status-num.pipe';
import { IsMobilePipe } from './ng-pipe/is-mobile.pipe';

const declarationsArr = [
    AppMenuComponent,
    AppHeaderComponent,
    ZglFilterComponent,
    ZglFormsComponent,
    ExtattrDescPipe,
    CustomerStatusNumPipe,
    LogoIconComponent,
    IsMobilePipe
];

@NgModule({
    declarations: declarationsArr,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        QRCodeModule,
        NgxBarcode6Module,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        NzSpinModule,
        NzPopconfirmModule,
        NzTableModule,
        NzMenuModule,
        NzDrawerModule,
        NzPaginationModule,
        NzSelectModule,
        NzInputNumberModule,
        NzDescriptionsModule,
        NzLayoutModule,
        NzBackTopModule,
        NzSkeletonModule,
        NzToolTipModule,
        NzTimelineModule,
        NzTabsModule,
        NzStatisticModule,
        NzBreadCrumbModule,
        NzDropDownModule,
        NzPageHeaderModule,
        NzGridModule,
        NzAffixModule,
        NzStepsModule,
        NzAutocompleteModule,
        NzCascaderModule,
        NzCheckboxModule,
        NzDatePickerModule,
        NzRadioModule,
        NzSliderModule,
        NzSwitchModule,
        NzTreeSelectModule,
        NzUploadModule,
        NzCardModule,
        NzCarouselModule,
        NzCollapseModule,
        NzEmptyModule,
        NzListModule,
        NzPopoverModule,
        NzTagModule,
        NzMessageModule,
        NzFormModule
    ],
    exports: declarationsArr
})
export class ZglCommonModule {
}

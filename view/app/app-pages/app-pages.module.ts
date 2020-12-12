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
    NzTreeModule,
    NzToolTipModule, NzTreeSelectModule, NzUploadModule
} from 'ng-zorro-antd';
const nzArrList= [
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
    NzTreeModule,
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
    NzFormModule,
]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPagesComponent } from './app-pages.component';
import { RouterModule, Routes } from '@angular/router';
import { ZglCommonModule } from '../ng-component/zgl-common.module';
import { CanotfindComponent } from './404/canotfind/canotfind.component';

const routes: Routes = [
    {
        path: '', component: AppPagesComponent, children: [
            { path: '', redirectTo: '404', pathMatch: 'prefix' },
            {
                path: '404', component: CanotfindComponent
            },
        ]
    }
];
@NgModule({
    declarations: [
        AppPagesComponent,
        CanotfindComponent
    ],
    imports: [
        ...nzArrList,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        CommonModule,
        ZglCommonModule
    ],
    providers: []
})

export class AppPagesModule { }

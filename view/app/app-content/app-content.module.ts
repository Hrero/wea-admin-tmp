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
    NzToolTipModule, NzTreeSelectModule, NzUploadModule,
    NzResultModule
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
    NzResultModule
]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppContentComponent } from './app-content.component';
import { RouterModule, Routes } from '@angular/router';
import { ZglCommonModule } from '../ng-component/zgl-common.module';
import { DashboardComponent } from './app-home/dashboard/dashboard.component';
import { PowerService } from '../ng-sevice/power.service';
import { MenuService } from '../ng-sevice/menu.service';
import { JurisdictionService } from '../ng-sevice/jurisdiction.service';

const routes: Routes = [
    {
        path: '', component: AppContentComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            {
                path: 'home', component: AppHomeComponent, children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
                    { path: 'dashboard', component: DashboardComponent }
                ]
            }
        ]
    }
];
@NgModule({
    declarations: [AppHomeComponent, 
        AppContentComponent, 
        DashboardComponent
    ],
    imports: [
        ...nzArrList,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        CommonModule,
        ZglCommonModule
    ],
    providers: [PowerService, MenuService, JurisdictionService,
        {provide: 'apiUrl', useValue: 'https://jsonplaceholder.typicode.com/'}
    ]
})

export class AppContentModule { }

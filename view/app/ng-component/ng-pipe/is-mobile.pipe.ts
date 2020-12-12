import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../../ng-sevice/state.service';

@Pipe({
  name: 'isMobile'
})
export class IsMobilePipe implements PipeTransform {

    constructor(
        private state: StateService
    ) {}

    transform(value: unknown, ...args: unknown[]): unknown {
        return this.state.userSystemInfo.isMobile ? 24 : value;
    }

}

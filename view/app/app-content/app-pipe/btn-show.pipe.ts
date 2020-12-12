import { Pipe, PipeTransform } from '@angular/core';
import { JurisdictionService } from '../../ng-sevice/jurisdiction.service';

@Pipe({
  name: 'btnShow'
})
export class BtnShowPipe implements PipeTransform {
    constructor(
        private jurisdictionService: JurisdictionService
    ) {}
    transform(value: any, ...args: any[]): any {
        if (value && args.length) {
            const arr = args[0] || [];
            return arr.some(item => item === value);
        } else {
            return !value;
        }
    }

}

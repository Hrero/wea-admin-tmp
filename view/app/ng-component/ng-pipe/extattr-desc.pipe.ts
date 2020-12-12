import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extattrDesc'
})
export class ExtattrDescPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      if (value && typeof value === 'string') {
          const obj = JSON.parse(value);
          return obj['花名']
      }
      return null;
  }

}

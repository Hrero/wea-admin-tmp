import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerStatusNum'
})
export class CustomerStatusNumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      if (value) {
          let html = 0;
          switch (value) {
              case 10:
                  html = 0;
                  break;
              case 20:
                  html = 1;
                  break;
              case 30:
                  html = 2;
                  break;
              case 40:
                  html = 3;
                  break;
              default:
                  break;
          }
          return html
      }
      return 0;
  }

}

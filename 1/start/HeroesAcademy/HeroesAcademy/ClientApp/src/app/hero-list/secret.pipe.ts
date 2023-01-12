import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secret',
})
export class SecretPipe implements PipeTransform {
  transform(value: string, character: string): string {
    let result = '';
    for (let index = 0; index < value.length; index++) {
      result += character;
    }
    return result;
  }
}

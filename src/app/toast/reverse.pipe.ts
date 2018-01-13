import {Pipe, PipeTransform} from '@angular/core';
import {filter, reverse} from 'lodash';

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {

    transform(value: any, args?: any): any {

        value = filter(value, ['dismissed', false]);
        return reverse(value);
    }

}

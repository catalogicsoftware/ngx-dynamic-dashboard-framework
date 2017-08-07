/**
 * Created by jayhamilton on 2/3/17.
 */
import {PropertyBase} from './property-base';

export class DynamicDropdownProperty extends PropertyBase<string> {

    controlType = 'dynamicdropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

/**
 * Created by jayhamilton on 2/3/17.
 */
import {PropertyBase} from './property-base';


export class NumberProperty extends PropertyBase<number> {

    controlType = 'number';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = 'number'; // options['type']|| '';
    }

}

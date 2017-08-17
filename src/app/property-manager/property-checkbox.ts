/**
 * Created by jayhamilton on 2/3/17.
 */
import {PropertyBase} from './property-base';


export class CheckboxProperty extends PropertyBase<boolean> {

    controlType = 'checkbox';
    type: string;

    constructor(options: {} = {}) {

        super(options);
        this.type = 'checkbox'; // options['type'] || '';
    }

}
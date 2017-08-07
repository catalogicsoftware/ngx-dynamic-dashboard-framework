/**
 * Created by jayhamilton on 2/3/17.
 */
import {PropertyBase} from './property-base';

export class TextboxProperty extends PropertyBase<string> {

    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }

}

/**
 * Created by jayhamilton on 2/3/17.
 */
import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class PropertyControlService {

    constructor() {
    }


    toFormGroupFromPP(propertyPages: any[]) {

        const group: any = {};

        propertyPages.forEach(propertyPage => {

            propertyPage.properties.forEach(property => {
                group[property.key] = property.required ? new FormControl(property.value
                    || '', Validators.required) : new FormControl(property.value
                    || '');
            });

        });

        return new FormGroup(group);
    }
}

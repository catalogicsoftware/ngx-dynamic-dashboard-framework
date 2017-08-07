import {Injectable} from '@angular/core';
import {DropdownProperty} from '../../property-manager/property-dropdown';
import {PropertyBase} from '../../property-manager/property-base';
import {TextboxProperty} from '../../property-manager/property-textbox';
import {HiddenProperty} from '../../property-manager/property-hidden';
import {CheckboxProperty} from '../../property-manager/property-checkbox';
import {DynamicDropdownProperty} from '../../property-manager/property-dynamicdropdown';
import {NumberProperty} from '../../property-manager/property-number';

@Injectable()
export class GadgetPropertyService {

    constructor() {
    }

    setPropertiesAndValues(defaultProperties: any[], properties: PropertyBase<any>[]) {
        let ctrl: PropertyBase<any>;

        properties.length = 0;

        defaultProperties.forEach(function (property) {

            if (property.controlType === 'dropdown') {
                ctrl = new DropdownProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'textbox') {
                ctrl = new TextboxProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'checkbox') {
                ctrl = new CheckboxProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'hidden') {
                ctrl = new HiddenProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'number') {
                ctrl = new NumberProperty(property);
                properties.push(ctrl);
            } else if (property.controlType === 'dynamicdropdown') {
                ctrl = new DynamicDropdownProperty(property);
                properties.push(ctrl);

            }
        });

        properties.sort((a, b) => a.order - b.order);
    }

    setPropertyPagesAndProperties(defaultPropertyPages: any[], propertyPages: any[]) {

        const me = this;

        // for each defaultPropertyPage object, get the properties
        defaultPropertyPages.forEach(function (propertyPage) {

            const newPropertyPage: any = {};

            for (const property in propertyPage) {

                if (propertyPage.hasOwnProperty(property)) {

                    if (property !== 'properties') {

                        newPropertyPage[property] = propertyPage[property];

                    } else {

                        const properties: PropertyBase<any>[] = [];
                        me.setPropertiesAndValues(propertyPage.properties, properties);
                        newPropertyPage['properties'] = properties;
                    }
                }
            }

            propertyPages.push(newPropertyPage);

        });
    }
}

import {PropertyBase} from '../../dynamic-form/property-base';

/**
 * Created by jayhamilton on 6/15/17.
 */

export class GadgetConfigModel {
    propertyPages: PropertyPage[] = [];

    constructor(config: any) {

        config.propertyPages.forEach((page) => {

            const props: PropertyBase<any>[] = [];

            page.properties.forEach((prop) => {

                switch (prop.controlType) {
                    case 'textbox':
                    case 'dropdown':
                    case 'dynamicdropdown':
                        props.push(new PropertyBase<string>(prop));
                        break;
                    case 'checkbox':
                        props.push(new PropertyBase<boolean>(prop));
                        break;
                    case 'hidden':
                        props.push(new PropertyBase<number>(prop));
                        break;
                    default:
                        props.push(new PropertyBase<string>(prop));
                        break;
                }
            });

            this.propertyPages.push(new PropertyPage(page.displayName, page.groupId, page.position, props));
        });
    }
}

class PropertyPage {
    displayName: string;
    groupId: string;
    position: number;
    properties: PropertyBase<any>[];

    constructor(displayName: string, groupId: string, position: number, properties: PropertyBase<any>[]) {
        this.displayName = displayName;
        this.groupId = groupId;
        this.position = position;
        this.properties = properties;
    }
}

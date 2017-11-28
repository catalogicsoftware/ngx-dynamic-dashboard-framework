import {Facet, Tag} from './facet-model';

export class FacetTagProcessor {

    facet_tags: Array<Facet> = [];
    objectList: any[];

    constructor(objectList: any[]) {
        this.objectList = objectList;
    }

    getFacetTags() {

        const me = this;
        this.objectList.forEach(function (item) {

            me.formatAndUpdateTagList(item.tags);

        });

        return this.facet_tags;
    }

    formatAndUpdateTagList(items: any[]) {

        items.forEach(tag => {

            // add the first facet and tag to the facet_tag array
            if (!this.facet_tags.length) {

                this.createFacetAndAddItToTheFacetTagArray(tag);

            } else {

                let facetExists = false;

                this.facet_tags.forEach(facet => {

                    if (facet.name.toLowerCase() === tag.facet.toLowerCase()) {
                        facetExists = true;
                    }
                });

                if (facetExists) {

                    this.updateFacetWithTag(tag);

                } else {

                    this.createFacetAndAddItToTheFacetTagArray(tag);

                }
            }
        });
    }

    createFacetAndAddItToTheFacetTagArray(tag: any) {

        const _tags: Array<Tag> = [];
        const _tag: Tag = this.createTag(this.capitalize(tag.name));

        _tags.push(_tag);

        const facet: Facet = new Facet(tag.facet, _tags);

        this.facet_tags.push(facet);

    }

    createTag(tag) {

        return new Tag(tag);
    }

    updateFacetWithTag(tag: any) {

        // find the facet and then add the tag or update the count
        this.facet_tags.forEach(facet => {

            if (facet.name.toLowerCase() === tag.facet.toLowerCase()) {


                let tagExists = false;


                facet.tags.forEach(_tag => {

                    if (_tag.name.toLowerCase() === tag.name.toLowerCase()) {

                        tagExists = true;

                        _tag.count = _tag.count + 1;

                    }

                });

                if (!tagExists) {

                    facet.tags.push(this.createTag(this.capitalize(tag.name)));
                }
            }

        });
    }

    capitalize(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}

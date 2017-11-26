import { Component, EventEmitter, Output} from '@angular/core';
import {AddGadgetService} from '../../add-gadget/service';
import {Facet, Tag} from './facet-model';
/**
 * Created by jayhamilton on 6/27/17.
 */
@Component({
    moduleId: module.id,
    selector: 'app-filter-list',
    template: `
        <br>
        <div *ngFor='let facet of facet_tags ;let i = index'>
          
            <app-facet [facet]='facet' (tagSelectEvent)='tagSelect($event)' [openFacet]='i < 2'> </app-facet>
        
        </div>
    `,
    styleUrls: ['./styles.css']
})
export class FilterListComponent {
    @Output() tagSelectEvent: EventEmitter<any> = new EventEmitter();
    facet_tags: Array<Facet> = [];

    constructor(private _addGadgetServjce: AddGadgetService) {

        this.getTagsFromLibrary();

    }

    getTagsFromLibrary() {

        this._addGadgetServjce.getGadgetLibrary().subscribe(data => {

            const  me = this;
            data.library.forEach(function (item) {

                me.formatAndUpdateTagList(item.tags);

            });
        });
    }

    formatAndUpdateTagList(gadgetTags: any[]) {

        gadgetTags.forEach(tag => {

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


    /**
     * todo - create use the custom pipe
     * @param value
     * @returns {string}
     */
    capitalize (value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    tagSelect(tagName) {

        this.tagSelectEvent.emit(tagName);

    }
}

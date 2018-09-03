import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;


        searchText = searchText.toLowerCase();
        return items.filter( it => {
            return it.node.toLowerCase().includes(searchText)
                || it.master.toLowerCase().includes(searchText)
                || it.jobName.toLowerCase().includes(searchText)
                || it.status.toLowerCase().includes(searchText);
        });
    }
}

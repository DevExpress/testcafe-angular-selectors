import {Component, Input} from '@angular/core';

@Component({
    selector: 'list-item',
    template: '<p>{{id}}</p>'
})
export class ListItemComponent {
    @Input() id: string;
}
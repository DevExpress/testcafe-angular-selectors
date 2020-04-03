import { Component, Input } from '@angular/core';

@Component({
    selector: 'list',
    template: `<list-item id="{{this.getId(1)}}"></list-item>
               <list-item id="{{this.getId(2)}}"></list-item>
               <list-item id="{{this.getId(3)}}"></list-item>`
})
export class ListComponent {
    @Input() id: string;

    getId(postfix: string) {
        return this.id + '-item' + postfix;
    }
}

import { Component, VERSION } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    rootProp1 = 1;
    version = VERSION.full
}

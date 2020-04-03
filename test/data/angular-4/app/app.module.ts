import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        ListComponent,
        ListItemComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {Component} from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    actualDate: Date;

    constructor(public app: AppComponent) {
        this.actualDate = new Date();
    }
}

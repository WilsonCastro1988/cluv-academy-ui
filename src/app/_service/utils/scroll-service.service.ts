
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private sectionClickedSource = new Subject<string>();
    sectionClicked$ = this.sectionClickedSource.asObservable();

    constructor() { }

    scrollToSection(sectionId: string) {
        this.sectionClickedSource.next(sectionId);
    }
}

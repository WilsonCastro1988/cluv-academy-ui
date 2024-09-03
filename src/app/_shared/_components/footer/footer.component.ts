import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public email: string = "hello@kpitalink.com";
  public actualDate: Date = new Date();
}

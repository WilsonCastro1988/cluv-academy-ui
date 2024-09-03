import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @Input() size: number = 0;
  public style: String = "";

  ngOnInit(): void {
    this.style = `width: ${this.size}rem; height: ${this.size}rem;`;
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

   ngOnInit(): void {
  }

   @Output() defaulView = new EventEmitter<string>();

  switchViews(view:string){
    this.defaulView.emit(view);
  }
}

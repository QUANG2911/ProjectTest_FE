import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // dung routerLink
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-body',
  imports: [RouterModule, CommonModule],
  templateUrl: './Body.component.html',
  styleUrl: './Body.component.css'
})
export class BodyComponent{
  
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  
  getBodyClass():string{

    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768)
    {
      styleClass = 'body-trimmed';
    }
    else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0)
    {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}

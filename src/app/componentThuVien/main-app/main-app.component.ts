import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { SidenavComponent } from '../ThuVien/SideNav/SideNav.component';
import { SideNavToggle } from '../../Model/SideNavToggle.Model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-app',
  imports: [SidenavComponent,BodyComponent],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWight;
    this.isSideNavCollapsed = data.collapsed;
  }
}

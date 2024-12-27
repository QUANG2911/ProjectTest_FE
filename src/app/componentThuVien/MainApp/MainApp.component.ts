import { Component } from '@angular/core';
import { BodyComponent } from '../Body/Body.component';
import { SidenavComponent } from '../ThuVien/SideNav/SideNav.component';
import { SideNavToggle } from '../../Model/SideNavToggle.Model';


@Component({
  selector: 'app-main-app',
  imports: [SidenavComponent,BodyComponent],
  templateUrl: './MainApp.component.html',
  styleUrl: './MainApp.component.css'
})
export class MainAppComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWight;
    this.isSideNavCollapsed = data.collapsed;
  }
}

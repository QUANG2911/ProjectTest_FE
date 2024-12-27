import {  Component, EventEmitter, HostListener, inject, OnDestroy, OnInit, Output } from '@angular/core';

import { Router, RouterModule } from '@angular/router'; // dung routerLink
import { CommonModule } from '@angular/common'; // dung *ngFor *ngIF
import { SideNavToggle } from '../../../Model/SideNavToggle.Model';
import {MatIconModule} from '@angular/material/icon';
import { DataService } from '../../../Service/DataService';
import { ThongBaoComponent } from '../Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { NavBarData } from './NavData';


@Component({
  selector: 'app-sidenav',
  imports: [CommonModule,RouterModule,MatIconModule],
  templateUrl: './SideNav.component.html',
  styleUrl: './SideNav.component.css'
})
export class SidenavComponent implements OnInit{

  
  // dong mo side bar
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor(
                private router: Router,
                private dataService: DataService
              ){}

  collapsed = false;
  screenWidth = 0;
  navData: any = NavBarData;
  userId: string = "";
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWight: this.screenWidth})
  }

  closeSidenav(): void{
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWight: this.screenWidth})
  }
  //

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) // nếu chọn No là undefined
      {
        this.router.navigate(['/login']);  
      }
    });
  } 
  Out()
  {
    this.dataService.setData({TilteThongBao: "Thông báo ", maNhap: 'Out', NoiDungThongBao : "Bạn có muốn đăng xuất khỏi hệ thống", LoaiThongBao: 1});
    this.openDialog('0ms', '0ms');
  }

  showItemNavi()
  {
    this.userId = this.dataService.getUserId();
    if(this.userId === "SNP")
    {
      this.navData = NavBarData
    }
    else{
      this.navData = NavBarData.filter(item =>['EntryContainerForm', 'ExitContainerForm'].includes(item.routeLink));
    }
  }
  //HostListener: là hàm tự động chạy
  //window: resize: chạy khi thay đổi kích thước 
  @HostListener('window: resize',['$event'])
  onResize(event : any) // dùng để thu thanh bar khi kích thước màn hình nhỏ hơn 768
  {
    this.screenWidth = window.innerWidth
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.closeSidenav();
    }
  }

  ngOnInit(): void {
  this.showItemNavi();
    if(typeof window != 'undefined'){
       this.screenWidth = window.innerWidth; // lấy kích thước window truyền qua Body đê thu nhỏ đẩy content qua 1 góc
    }
  }

}

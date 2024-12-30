import { Component, destroyPlatform, inject, OnDestroy, OnInit, signal, ViewContainerRef } from '@angular/core';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Login } from '../../Model/login.model';
import { Notification, Title } from '../../Key/KeyThongBao';
@Component({
  selector: 'app-login-in',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,MatSelectModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.css'
})
export class LoginInComponent{
  //Khai báo các biến 
  ////// thông báo dialog
  readonly dialog = inject(MatDialog);

 //// khai báo biến để lấy dữ liệu từ API và lưu dữ liệu chuyền qua các component khác
  constructor(
    private dataService :DataService,
    private api :ApiService,
    private router: Router
   ){}
  
  dataNotice = Notification;
  dataTilte = Title;

  ///// khai báo nút ẩn hiện password
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  ///// khai báo biến để hứng dữ liệu từ api
  userLogin!: Login ;

  //Hàm thực hiện sự kiện click button Login
  Login(inputUser : any ,inputPass : any, inputLoaiTk: any){
    console.log(inputLoaiTk.value);
    if(inputUser.value.trim() === '' || inputPass.value.trim() === '')
    {
      
      this.GetNotification(this.dataNotice.find(n => n.field === 'MissingLoginInfo')?.label.toString());
    }      
    else if(inputLoaiTk.value === undefined)
    {
      this.GetNotification(this.dataNotice.find(n => n.field === 'SelectAccountType')?.label.toString());
    }
    else{
      this.CheckUserLogin(inputUser.value,inputPass.value,inputLoaiTk.value)
    }
  }

  //Hàm kiểm tra thông tin đăng nhập
  CheckUserLogin(Username: string, Pass: string, typeAccount: string)
  {
    this.api.GetUserLogin(Username,Pass).subscribe(
      (data) => {
      console.log(data);
      this.userLogin = data as Login;

        if(typeAccount === 'customer')
        {
          if(this.userLogin.idCustomer === null)
          {            
            this.GetNotification(this.dataNotice.find(n => n.field === 'CustomerNotFound')?.label.toString());
          }
          else
          {
            this.dataService.setUserId(this.userLogin.idCustomer);
            console.log("login idCustomer: " + this.userLogin.idCustomer);
            this.router.navigate(['/mainApp']);
          }         
        }
        else
        {
          if(this.userLogin.idStaff === null)
            {
              this.GetNotification(this.dataNotice.find(n => n.field === 'EmployeeNotFound')?.label.toString());
            }
            else
            {
              this.dataService.setUserId(this.userLogin.idStaff);
              console.log("login manv: " + this.userLogin.idStaff);
              this.router.navigate(['/mainApp']);
            }
        }  
      },(error) =>{
        this.GetNotification(this.dataNotice.find(n => n.field === 'LoginNotFound')?.label.toString());
      }
   )
  }

  //Hàm thông báo
  GetNotification(noiDungThongBao: any){
    this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : noiDungThongBao, LoaiThongBao: 2});
    this.openDialog('0ms', '0ms');
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '400px'
    });
  }
}

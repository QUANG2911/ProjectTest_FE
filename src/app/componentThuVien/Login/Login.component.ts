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
      this.GetNotification("Vui lòng điền đầy đủ Username và Password");
    }      
    else if(inputLoaiTk.value === undefined)
    {
      this.GetNotification("Vui lòng chọn loại tài khoản đăng nhập");
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
          if(this.userLogin.maKH === null)
          {            
            this.GetNotification("Không tồn tại tài khoản khách hàng này");
          }
          else
          {
            this.dataService.setUserId(this.userLogin.maKH);
            console.log("login makh: " + this.userLogin.maKH);
            this.router.navigate(['/mainApp']);
          }         
        }
        else
        {
          if(this.userLogin.maNv === null)
            {
              this.GetNotification("Không tồn tại tài khoản nhân viên này");
            }
            else
            {
              this.dataService.setUserId(this.userLogin.maNv);
              console.log("login manv: " + this.userLogin.maNv);
              this.router.navigate(['/mainApp']);
            }
        }  
      },(error) =>{
        this.GetNotification("Không tồn tại tài khoản này");
      }
   )
  }

  //Hàm thông báo
  GetNotification(noiDungThongBao: string){
    this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : noiDungThongBao, LoaiThongBao: 2});
    this.openDialog('0ms', '0ms');
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px'
    });
  }
}

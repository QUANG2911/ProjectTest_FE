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
import { Console, error } from 'console';
import {MatSelectModule} from '@angular/material/select';
import { Login } from '../../Model/login.model';
@Component({
  selector: 'app-login-in',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,MatSelectModule],
  templateUrl: './login-in.component.html',
  styleUrl: './login-in.component.css'
})
export class LoginInComponent{
  readonly dialog = inject(MatDialog);

  constructor(
    private dataService :DataService,
    private api :ApiService,
    private router: Router
   ){}
   
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  userLogin!: Login ;

  kiemTraDangNhap(Username: string, Pass: string, loaiTk: string)
  {
    this.api.GetThongTinLogin(Username,Pass).subscribe(
      (data) => {
      console.log(data);
      this.userLogin = data as Login;
        console.log(loaiTk);
        if(loaiTk === 'kh')
        {
          if(this.userLogin.maKH === null)
          {
            this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Không tồn tại tài khoản khách hàng này", LoaiThongBao: 2});
            this.openDialog('0ms', '0ms');
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
              this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Không tồn tại tài khoản nhân viên này", LoaiThongBao: 2});
              this.openDialog('0ms', '0ms');
            }
            else
            {
              this.dataService.setUserId(this.userLogin.maNv);
              console.log("login manv: " + this.userLogin.maNv);
              this.router.navigate(['/mainApp']);
            }
        }
        
      },(error) =>{
        this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Không tồn tại tài khoản này", LoaiThongBao: 2});
        this.openDialog('0ms', '0ms');
      }
   )
  }

  Login(inputUser : any ,inputPass : any, inputLoaiTk: any){
    console.log(inputLoaiTk.value);
    if(inputUser.value.trim() === '' || inputPass.value.trim() === '')
    {
      this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Vui lòng điền đầy đủ Username và Password", LoaiThongBao: 2});
      this.openDialog('0ms', '0ms');
    }      
    else if(inputLoaiTk.value === undefined)
    {
      this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Vui lòng chọn loại tài khoản đăng nhập", LoaiThongBao: 2});
      this.openDialog('0ms', '0ms');
    }
    else{
      this.kiemTraDangNhap(inputUser.value,inputPass.value,inputLoaiTk.value)
    }
  }

  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px'
    });
  }
}

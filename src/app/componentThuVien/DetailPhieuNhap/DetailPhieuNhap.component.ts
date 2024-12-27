import { DataService } from '../../Service/DataService';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { ContainerTransport, Detail } from '../../Key/KeyThongTinContainer';
import { ApiService } from '../../Service/ApiService';
import { DetailPhieuNhap } from '../../Model/DetailPhieuNhap.model';
import {MatButtonModule} from '@angular/material/button';

import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detail-phieu-nhap',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule],
  templateUrl: './DetailPhieuNhap.component.html',
  styleUrl: './DetailPhieuNhap.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPhieuNhapComponent implements OnInit{
  ELEMENT_DATA!: DetailPhieuNhap ;

  dataDetail: { [key: string]: string | number |Date}={};

  keyDetail = Detail;
  
  keyTrans = ContainerTransport.filter(p =>p.field === 'macontainer' || p.field === 'ngayditoivitri' || p.field === 'donViDuaToiCang' || p.field == 'bienSoDonViVanChuyen');
  // lấy dữ liệu của API gửi lên
  maPhieuNhap : string ="";
  trangthaiduyet: number = 0;
  idUser: string ="";

  itemsToShow: number[] = [];

  constructor(
              private dataService :DataService,
              private api :ApiService,
              private router: Router
             ){}
  
 setItemsToShow(trangthaiduyet: number,idUser: string) {
    if (trangthaiduyet == 0 && idUser === 'SNP') {
      this.itemsToShow = [1]; // Hiển thị Button 
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }



  getDuLieuTuDsPhieu()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data) {  // Kiểm tra data 
        this.maPhieuNhap = data.maNhap;
        this.trangthaiduyet = data.trangthaiduyet;
        this.idUser = data.idUser;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    });
  }
  ngOnInit(): void {      
    this.getDuLieuTuDsPhieu(); 
    this.setItemsToShow(this.trangthaiduyet, this.idUser);
    this.getDetailsPhieu(this.maPhieuNhap);
  }

  getDetailsPhieu(maPhieuNhap: string)
  {
    if(maPhieuNhap != null)
    {
      this.api.getDetailsPhieuNhap(maPhieuNhap).subscribe(
        (data) =>{  
            console.log(data);        
            this.ELEMENT_DATA = data as DetailPhieuNhap;
            this.dataDetail["donViDuaToiCang"] = this.ELEMENT_DATA.transportEntryType;
            this.dataDetail["loaiContainer"] = this.ELEMENT_DATA.typeContainer;
            this.dataDetail["maIso"] = this.ELEMENT_DATA.isoCode;
            this.dataDetail["ngayditoivitri"] = formatDate(this.ELEMENT_DATA.dateOfContainerEntry,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            this.dataDetail["macontainer"] = this.ELEMENT_DATA.idContainer;
            this.dataDetail["size"] = this.ELEMENT_DATA.size;
            this.dataDetail["trongLuongRong"] = this.ELEMENT_DATA.tareWeight;
            this.dataDetail["trongLuongTong"] = this.ELEMENT_DATA.maxWeight;
            this.dataDetail["bienSoDonViVanChuyen"] = this.ELEMENT_DATA.transportEntryLicensePlate;
        }
      );
    }
    else{
      console.log('maPhieuNhap rỗng');
    }   
  }

  CapNhatTrangThai(trangThai: number)
  {
    this.trangthaiduyet = trangThai;
    if(trangThai == 1)
    {
      this.dataService.setData({TilteThongBao: "Duyệt đơn", maNhap: this.maPhieuNhap, NoiDungThongBao : "Bạn có muốn duyệt đơn này", LoaiThongBao: 1, trangthaiduyet: 1,idUser : this.idUser});
    }
    else if (trangThai == -1)
    {
      this.dataService.setData({TilteThongBao: "Từ chối đơn ", maNhap: this.maPhieuNhap, NoiDungThongBao : "Bạn có chắc từ chối đơn này", LoaiThongBao: 1,trangthaiduyet: -1,idUser : this.idUser});
    }
    this.openDialog('0ms', '0ms');
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {maPhieuNhap :this.maPhieuNhap, trangThai: this.trangthaiduyet}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) // nếu chọn No là undefined
      {
          this.api.putDetailsPhieuNhap(this.maPhieuNhap,this.trangthaiduyet).subscribe({
            next: (response) => {
              console.log('Cập nhật thành công:', response);
              this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : "Bạn đã cập nhật trạng thái thành công", LoaiThongBao: 2,idUser : this.idUser});
              this.ThongBaoCapNhat('0ms', '0ms');              
            },
            error: (error) => {
              window.alert('Đã xảy ra lỗi duyệt phiếu! Vui lòng thử lại.');
              console.error('Lỗi khi cập nhật:', error);
            }
          });
        console.log(result.maPhieuNhap);
        console.log(this.maPhieuNhap + this.trangthaiduyet);
      }
      else
      {
        this.trangthaiduyet = 0;
        console.log(result.maPhieuNhap);
      }
    });
  } 

  ThongBaoCapNhat(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
    {
       this.router.navigate(['/mainApp/phieuNhapcontainer']);
    };
  }

  TroVePageChinh()
  {
    this.router.navigate(['/mainApp/phieuNhapcontainer'])
  }
  
}

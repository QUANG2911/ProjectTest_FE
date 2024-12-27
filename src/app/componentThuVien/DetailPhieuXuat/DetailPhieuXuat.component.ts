import { DataService } from '../../Service/DataService';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { ContainerTransport } from '../../Key/KeyThongTinContainer';
import { ApiService } from '../../Service/ApiService';
import {MatButtonModule} from '@angular/material/button';

import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { DetailPhieuXuat } from '../../Model/DetailPhieuXuat.model';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-detail-phieu-xuat',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './DetailPhieuXuat.component.html',
  styleUrl: './DetailPhieuXuat.component.css'
})
export class DetailPhieuXuatComponent implements OnInit{
  
  dataDetail: { [key: string]: string | number |Date}={};

  private _liveAnnouncer = inject(LiveAnnouncer);

  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // keyDetail = Detail;
  
   // mũi tên hiện sắp xếp
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  keyTrans = ContainerTransport.filter(p =>p.field === 'ngayxuatcang' || p.field === 'donViXuatCang' || p.field === 'sdt' || p.field == 'bienSoDonViVanChuyen');
  // lấy dữ liệu của API gửi lên
  maPhieuNhap : string ="";
  trangthaiduyet: number = 0;
  idUser: string ="";

  itemsToShow: number[] = [];

  ELEMENT_DATA: DetailPhieuXuat[] = [];

  displayedColumns: string[] = ['macontainer','size','tenloai','dateOfEntryContainer'];
  dataSource: any;             

  originalData: DetailPhieuXuat[] = []; 
  
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
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },300); // Giả lập thời gian tải dữ liệu
  }

  getDetailsPhieu(maPhieuNhap: string)
  {
    this.api.GetDetailPhieuXuat(maPhieuNhap)
    .subscribe(
      (data) => {
        if(data != null)
        {
          console.log(data);
          this.ELEMENT_DATA = data as DetailPhieuXuat[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<DetailPhieuXuat>(this.ELEMENT_DATA);

          this.dataDetail['ngayxuatcang'] = formatDate(this.ELEMENT_DATA[0].dateOfExitContainer,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
          this.dataDetail['donViXuatCang'] = this.ELEMENT_DATA[0].tranportExitType;
          this.dataDetail['sdt'] = this.ELEMENT_DATA[0].phoneNumber;
          this.dataDetail['bienSoDonViVanChuyen'] = this.ELEMENT_DATA[0].tranportExitType;
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);
        }           
        else console.log('Không nhận được dữ liệu');        
      }
    ); 
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
          this.api.putDetailsPhieuXuat(this.maPhieuNhap,this.trangthaiduyet).subscribe({
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
      this.router.navigate(['/mainApp/phieuXuatContainer']);
    };
  }

  TroVePageChinh()
  {
    this.router.navigate(['/mainApp/phieuXuatContainer']);
  }

}

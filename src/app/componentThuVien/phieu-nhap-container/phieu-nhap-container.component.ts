import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';

import { MatIconModule } from '@angular/material/icon';

// khai báo format bên html
import { CommonModule } from '@angular/common';

//khai báo table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//khai báo router
import {Router, RouterModule} from '@angular/router'; // dung routerLink

// khai báo sort
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort,MatSortModule } from '@angular/material/sort';
import { DsPhieuNhap } from '../../Model/DsPhieuNhap.model';
import { FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'; // Nếu cần nhập liệu
import { MatButtonModule } from '@angular/material/button'; // Nếu có sử dụng button
import { DropDownListComponent } from '../ThuVien/DropDownList/DropDownList.component';

@Component({
  selector: 'app-phieu-nhap-container',
  imports: [DropDownListComponent,MatFormFieldModule,MatSelectModule, MatOptionModule,MatInputModule,MatButtonModule,MatIconModule,MatPaginator,MatSort,MatSortModule, MatTableModule,MatPaginatorModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './phieu-nhap-container.component.html',
  styleUrl: './phieu-nhap-container.component.css',
})
export class PhieuNhapContainerComponent implements OnInit, AfterViewInit{
  

  idUser: string = "";  

  item!: string; 

  constructor(private dataService :DataService,
              private api :ApiService,
              private router : Router
             ){}
  
  ELEMENT_DATA: DsPhieuNhap[] = [];
  
  // hàm sắp xếp
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;

  itemsToShow: number[] = [];

  setItemsToShow() {
    if (this.idUser !== 'SNP') {
      this.itemsToShow = [1]; 
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }

  //Lấy dữ liệu từ API
  getListContainer(): void{
    this.isLoading = true;
    this.api.getDsPhieuNhap(this.idUser)
    .subscribe(
      (data) => {
        if(data.length > 0)
        {
          this.ELEMENT_DATA = data as DsPhieuNhap[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<DsPhieuNhap>(this.ELEMENT_DATA);
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);

          //select trạng thái
          this.getDulieuTrangThai()
      
          this.isLoading = false;
        }           
        else console.log('Không nhận được dữ liệu');        
      }
    ); 
  }

  getDulieuTrangThai()
  {
      this.dataService.getData();

      this.dataService.currentData.subscribe((data) =>
      {
        if(data.selectOption != null)
        {
          this.DanhSachTrangThai(data.selectOption);
        }   
        console.log(data.selectOption);  
      });
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();
    console.log("Phieu Nhap:" + this.idUser);
    this.setItemsToShow();
    this.getListContainer();
  }
  
  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500); // Giả lập thời gian tải dữ liệu
  }


  ngAfterViewInit(): void {
    this.fetchData();
  }

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['maphieunhap','ngayDk', 'tenkh', 'sdt','ngayGiaoContainer','trangthaiduyet','action'];
  dataSource: any;             

  originalData: DsPhieuNhap[] = []; 
  
  
   // hàm sreach  
  SearchMaContainer(maphieunhap: any): void
  {
    this.item = maphieunhap.value;
    if(this.item != null)
    {
      this.dataSource.data = this.originalData.filter(p=>p.maPhieuNhap.toLowerCase().includes(this.item.toLowerCase()));
    }
    else {
      this.dataSource.data = this.originalData;
    }
  }

  // select Trạng thái
  DanhSachTrangThai(TrangThai: any):void
  {
    console.log(TrangThai);
    if(TrangThai == 1  || TrangThai == 0 || TrangThai == -1)
    {
      this.dataSource.data = this.originalData.filter( p=> p.trangThaiDuyet == TrangThai);
    }
    else{
      this.dataSource.data = this.originalData;
    }
  }

  // mũi tên hiện sắp xếp
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  tam :any;
  // ham chuyen page detail
  TransformDetailPhieuNhapPage(maPhieuNhap: string, trangthaiduyet: number): void{  
    if(maPhieuNhap != null) 
    {
      this.dataService.setData({maNhap: maPhieuNhap, trangthaiduyet: trangthaiduyet,idUser :this.idUser});
      this.router.navigate(['/mainApp/detailPhieuNhap']);
    }      
    else 
      console.log('maNhap is null');
  }

  //ham chuyen page add
  ChuyenPageAdd(){
    this.dataService.setData({idUser :this.idUser})
    this.router.navigate(['/mainApp/addPhieuNhap'])
  }

}

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

import { FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'; // Nếu cần nhập liệu
import { MatButtonModule } from '@angular/material/button'; // Nếu có sử dụng button
import { DropDownListComponent } from '../ThuVien/DropDownList/DropDownList.component';
import { DsPhieuXuat } from '../../Model/DsPhieuXuat.model';



@Component({
  selector: 'app-phieu-xuat-container',
  imports: [DropDownListComponent,MatFormFieldModule,MatSelectModule, MatOptionModule,MatInputModule,MatButtonModule,MatIconModule,MatPaginator,MatSortModule, MatTableModule,MatPaginatorModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './PhieuXuatContainer.component.html',
  styleUrl: './PhieuXuatContainer.component.css'
})
export class PhieuXuatContainerComponent implements OnInit{
  
  idUser: string = '';  

  item!: string; 

  constructor(private dataService :DataService,
              private api :ApiService,
              private router : Router
             ){}
  
  ELEMENT_DATA: DsPhieuXuat[] = [];
  
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
    this.api.GetDsPhieuXuat(this.idUser)
    .subscribe(
      (data) => {
        if(data.length > 0)
        {
          this.ELEMENT_DATA = data as DsPhieuXuat[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<DsPhieuXuat>(this.ELEMENT_DATA);
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);

          //select trạng thái
          this.getDulieuTrangThai()

          // set page và sort của table
          
      
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
      });
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();
    console.log("Phieu Nhap:" + this.idUser);
    this.getListContainer();
    this.setItemsToShow();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },300); // Giả lập thời gian tải dữ liệu
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['maphieuxuat','dateOfExitRegistration', 'tenKh', 'sdt','dateOfExitContainer','trangthaiduyet','action'];
  dataSource: any;             

  originalData: DsPhieuXuat[] = []; 
  
  // hàm sreach  
  SearchMaContainer(maphieuxuat: any): void
  {
    this.item = maphieuxuat.value;
    if(this.item != null)
    {
      this.dataSource.data = this.originalData.filter(p=>p.idExitForm.toLowerCase().includes(this.item.toLowerCase()));
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
      this.dataSource.data = this.originalData.filter( p=> p.status == TrangThai);
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
  TransformDetailPhieuXuatPage(maPhieuXuat: string, trangthaiduyet: number): void{  
    if(maPhieuXuat != null) 
    {
      this.dataService.setData({maNhap: maPhieuXuat, trangthaiduyet: trangthaiduyet,idUser :this.idUser});
      this.router.navigate(['/mainApp/detailPhieuXuat']);
    }      
    else 
      console.log('maXuat is null');
  }

  //ham chuyen page add
  ChuyenPageAdd(){
    this.dataService.setData({idUser :this.idUser})
    console.log(this.idUser);
    this.router.navigate(['/mainApp/addPhieuXuat'])
  }
}

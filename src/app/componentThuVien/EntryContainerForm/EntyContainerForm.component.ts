import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { EntryContainerFormList } from '../../Model/EntryContainerFormList.model';
import { FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'; // Nếu cần nhập liệu
import { MatButtonModule } from '@angular/material/button'; // Nếu có sử dụng button
import { DropDownListComponent } from '../ThuVien/DropDownList/DropDownList.component';
import { Console } from 'node:console';

@Component({
  selector: 'app-phieu-nhap-container',
  imports: [DropDownListComponent,MatFormFieldModule, MatOptionModule,MatInputModule,MatButtonModule,MatIconModule,MatPaginator,MatSort,MatSortModule, MatTableModule,MatPaginatorModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './EntyContainerForm.component.html',
  styleUrl: './EntyContainerForm.component.css',
})
export class EntryContainerFormComponent implements OnInit{
  // khai báo biến
  //// biên idUser để lấy idUser từ local storage
  idUser: string = "";  

  //// khai báo biến để lấy dữ liệu từ API và lưu dữ liệu chuyền qua các component khác
  constructor(private dataService :DataService,
              private api :ApiService,
              private router : Router
             ){}
  
  //// biến để hứng dữ liệu từ API
  ELEMENT_DATA: EntryContainerFormList[] = [];
  
  //// sắp xếp
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  //// list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //// biến để lưu giá trị vòng tròn loading
  isLoading: boolean = false;

  //// biến để lưu giá trị trạng thái show button add khi user là tài khoản Customer
  itemsToShow: number[] = [];

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['idEntryForm','dateOfEntryContainer', 'customerName', 'phoneNumber','dateOfEntryRegistration','status','action'];
  
  dataSource: any;             

  originalData: EntryContainerFormList[] = []; 
  

  setItemsToShow() {
    if (this.idUser !== 'SNP') {
      this.itemsToShow = [1]; 
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }

  //Lấy dữ liệu từ API
  getListEntryForm(): void{
    this.isLoading = true;
    this.api.getDsPhieuNhap(this.idUser)
    .subscribe(
      (data) => {
        if(data.length > 0)
        {
          this.ELEMENT_DATA = data as EntryContainerFormList[];

          console.log(this.ELEMENT_DATA);
          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<EntryContainerFormList>(this.ELEMENT_DATA);
          
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);

          //select trạng thái
          this.getListWithStatus()
      
          this.isLoading = false;
        }           
        else console.log('Không nhận được dữ liệu');        
      }
    ); 
  }

  getListWithStatus()
  {
      this.dataService.getData();

      this.dataService.currentData.subscribe((data) =>
      {
        if(data.selectOption != null)
        {
          this.ListStatus(data.selectOption);
        }   
        console.log(data.selectOption);  
      });
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();
    console.log("Phieu Nhap:" + this.idUser);
    this.setItemsToShow();
    this.getListEntryForm();
    this.fetchData();
  }
  
  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500); // Giả lập thời gian tải dữ liệu
  }
  
   // hàm sreach  
  SearchIdEntryForm(inputIdEntryForm: any): void
  {
    if(inputIdEntryForm.value != null)
    {
      this.dataSource.data = this.originalData.filter(p=>p.idEntryForm.toLowerCase().includes(inputIdEntryForm.value.toLowerCase()));
    }
    else {
      this.dataSource.data = this.originalData;
    }
  }

  // select Trạng thái
  ListStatus(TrangThai: any):void
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

  // ham chuyen page detail
  TransEntryContainerFormDetailPage(idEntryForm: string, status: number): void{  
    if(idEntryForm != null) 
    {
      this.dataService.setData({idEntryForm: idEntryForm, status: status,idUser :this.idUser});
      this.router.navigate(['/mainApp/EntryContainerFormDetail']);
    }      
    else 
      console.log('maNhap is null');
  }

  //ham chuyen page add
  TransEntryContainerFormAddPage(){
    this.dataService.setData({idUser :this.idUser})
    this.router.navigate(['/mainApp/EntryContainerFormAdd'])
  }

}

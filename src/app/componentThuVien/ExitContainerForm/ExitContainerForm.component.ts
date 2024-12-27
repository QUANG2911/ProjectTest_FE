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
import { ExitContainerFormList } from '../../Model/ExitContainerFormList.model';



@Component({
  selector: 'app-phieu-xuat-container',
  imports: [DropDownListComponent,MatFormFieldModule,MatSelectModule, MatOptionModule,MatInputModule,MatButtonModule,MatIconModule,MatPaginator,MatSortModule, MatTableModule,MatPaginatorModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './ExitContainerForm.component.html',
  styleUrl: './ExitContainerForm.component.css'
})
export class ExitContainerFormComponent implements OnInit{
  
  idUser: string = '';  

  constructor(private dataService :DataService,
              private api :ApiService,
              private router : Router
             ){}
  
  ELEMENT_DATA: ExitContainerFormList[] = [];
  
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
  getListExitForm(): void{
    this.isLoading = true;
    this.api.GetDsPhieuXuat(this.idUser)
    .subscribe(
      (data) => {
        if(data.length > 0)
        {
          this.ELEMENT_DATA = data as ExitContainerFormList[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<ExitContainerFormList>(this.ELEMENT_DATA);
          //
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
          this.StatusList(data.selectOption);
        }        
      });
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();
    console.log("Phieu Nhap:" + this.idUser);
    this.getListExitForm();
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
  displayedColumns: string[] = ['idExitForm','dateOfExitRegistration', 'customerName', 'phoneNumber','dateOfExitContainer','status','action'];
  dataSource: any;             

  originalData: ExitContainerFormList[] = []; 
  
  // hàm sreach  
  SearchIdExitForm(idExitForm: any): void
  {
    if(idExitForm.value != null)
    {
      this.dataSource.data = this.originalData.filter(p=>p.idExitForm.toLowerCase().includes(idExitForm.value.toLowerCase()));
    }
    else {
      this.dataSource.data = this.originalData;
    }
  }

  // select Trạng thái
  StatusList(status: any):void
  {
    console.log(status);
    if(status == 1  || status == 0 || status == -1)
    {
      this.dataSource.data = this.originalData.filter( p=> p.status == status);
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
  TransformExitFormDetailPage(idExitForm: string, status: number): void{  
    if(idExitForm != null) 
    {
      this.dataService.setData({idExitForm: idExitForm, status: status,idUser :this.idUser});
      this.router.navigate(['/mainApp/ExitContainerFormDetail']);
    }      
    else 
      console.log('maXuat is null');
  }

  //ham chuyen page add
  TransformExitFormAddPage(){
    this.dataService.setData({idUser :this.idUser})
    console.log(this.idUser);
    this.router.navigate(['/mainApp/ExitContainerFormAdd'])
  }
}

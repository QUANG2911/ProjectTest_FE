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
import { ExitContainerFormInformation } from '../../Model/ExitContainerFormInformation.model';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-detail-phieu-xuat',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './ExitContainerFormDetail.component.html',
  styleUrl: './ExitContainerFormDetail.component.css'
})
export class ExitContainerFormDetailComponent implements OnInit{
  
  dataDetail: { [key: string]: string | number |Date}={};

  private _liveAnnouncer = inject(LiveAnnouncer);

  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // keyDetail = Detail;
  
  keyTrans = ContainerTransport.filter(p =>p.field === 'ngayxuatcang' || p.field === 'donViXuatCang' || p.field === 'sdt' || p.field == 'bienSoDonViVanChuyen');
  // lấy dữ liệu của API gửi lên
  idExitForm : string ="";
  status: number = 0;
  idUser: string ="";

  itemsToShow: number[] = [];

  ELEMENT_DATA: ExitContainerFormInformation[] = [];

  displayedColumns: string[] = ['idContainer','size','typeContainerName','dateOfEntryContainer'];
  dataSource: any;             

  readonly dialog = inject(MatDialog);

  originalData: ExitContainerFormInformation[] = []; 
  
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

   // mũi tên hiện sắp xếp
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDataFormExitFormPage()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data) {  // Kiểm tra data 
        this.idExitForm = data.idExitForm;
        this.status = data.status;
        this.idUser = data.idUser;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    });
  }
  ngOnInit(): void {      
    this.getDataFormExitFormPage(); 
    this.setItemsToShow(this.status, this.idUser);
    this.getDetailsExitFormApi(this.idExitForm);
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },300); // Giả lập thời gian tải dữ liệu
  }

  getDetailsExitFormApi(maPhieuNhap: string)
  {
    this.api.GetDetailPhieuXuat(maPhieuNhap)
    .subscribe(
      (data) => {
        if(data != null)
        {
          console.log(data);
          this.ELEMENT_DATA = data as ExitContainerFormInformation[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<ExitContainerFormInformation>(this.ELEMENT_DATA);

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

  UpdateStatus(status: number)
  {
    this.status = status;
    let width: string = '300px';
    let susscess: boolean = true;
    let title: string = '';
    let content: string = '';
    let typeNotification: number = 1;
    if(status == 1)
    {
      width = '400px';
      title = "Duyệt đơn";
      content = "Bạn có muốn duyệt đơn này";
    }
    else if (status == -1)
    {
      
      width = '400px';
      title = "Từ chối đơn";
      content = "Bạn có chắc từ chối đơn này";
    }
    console.log("idExitForm" + this.idExitForm);
    
    this.GetNotification(title,content,typeNotification,width,susscess);
  }

  GetNotification(title: string, content: string, typeNotification : number, width: string, susscess: boolean)
  {
    this.dataService.setData({TilteThongBao: title, idExitForm: this.idExitForm, NoiDungThongBao : content, LoaiThongBao: typeNotification,status: this.status, idUser : this.idUser});
    this.openDialog('0ms', '0ms',width,susscess);
    console.log("idExitForm" + this.idExitForm);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,width: string,susscess: boolean): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: width,
      enterAnimationDuration,
      exitAnimationDuration,
      data: {idExitForm :this.idExitForm, trangThai: this.status}
    });

    if(susscess == true)
    {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) // nếu chọn No là undefined
        {
            this.api.putDetailsPhieuXuat(this.idExitForm,this.status).subscribe({
              next: (response) => {
                console.log('Cập nhật thành công:', response);    
                this.GetNotification("Thông báo","Bạn đã cập nhật trạng thái thành công",2,'400px',false);       
                this.ReturnExitPage();
              },
              error: (error) => {
                window.alert('Đã xảy ra lỗi duyệt phiếu! Vui lòng thử lại.');
                console.error('Lỗi khi cập nhật:', error);
              }
            });
          console.log(result.idExitForm);
          console.log(this.idExitForm + this.status);
        }
        else
        {
          this.status = 0;
          console.log(result.idEntryForm);
        }
      });
    }
  } 
  ReturnExitPage()
  {
    this.router.navigate(['/mainApp/ExitContainerForm']);
  }

}

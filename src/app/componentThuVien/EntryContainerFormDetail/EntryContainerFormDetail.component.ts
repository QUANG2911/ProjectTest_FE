import { DataService } from '../../Service/DataService';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { ContainerTransport, Detail } from '../../Key/KeyThongTinContainer';
import { ApiService } from '../../Service/ApiService';
import { EntryContainerFormInformation } from '../../Model/EntryContainerFormInformation.model';
import {MatButtonModule} from '@angular/material/button';

import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Notification, Title } from '../../Key/KeyThongBao';



@Component({
  selector: 'app-detail-phieu-nhap',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule],
  templateUrl: './EntryContainerFormDetail.component.html',
  styleUrl: './EntryContainerFormDetail.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryContainerFormDetailComponent implements OnInit{
  ELEMENT_DATA!: EntryContainerFormInformation ;

  dataDetail: { [key: string]: string | number |Date}={};

  keyDetail = Detail;
  
  // lấy dữ liệu từ key container để show ra dạng table ngang
  keyTrans = ContainerTransport.filter(p =>p.field === 'idContainer' || p.field === 'dateOfEntryContainer' || p.field === 'transportEntyType' || p.field == 'transportaLicense');
  
  // lấy dữ liệu của component Entry Form gửi
  idEntryForm : string ="";
  status: number = 0;
  idUser: string ="";

  itemsToShow: number[] = [];
  // biến dialog
  readonly dialog = inject(MatDialog);
  
  //// khai báo biến để lấy dữ liệu từ API và lưu dữ liệu chuyền qua các component khác
  constructor(
              private dataService :DataService,
              private api :ApiService,
              private router: Router
             ){}
  
  dataNotice = Notification;
  dataTilte = Title;

 setItemsToShow(status: number,idUser: string) {
    if (status == 0 && idUser === 'SNP') {
      this.itemsToShow = [1]; // Hiển thị Button 
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }

  getDataFromEntryContainerPage()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data) {  // Kiểm tra data 
        this.idEntryForm = data.idEntryForm;
        this.status = data.status;
        this.idUser = data.idUser;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    });
  }
  ngOnInit(): void {      
    this.getDataFromEntryContainerPage(); 
    this.setItemsToShow(this.status, this.idUser);
    this.getDetailsEntryFromApi(this.idEntryForm);
  }

  getDetailsEntryFromApi(idEntryForm: string)
  {
    if(idEntryForm != null)
    {
      this.api.getDetailsPhieuNhap(idEntryForm).subscribe(
        (data) =>{  
            console.log(data);        
            this.ELEMENT_DATA = data as EntryContainerFormInformation;
            this.dataDetail["transportEntyType"] = this.ELEMENT_DATA.transportEntryType;
            this.dataDetail["containerType"] = this.ELEMENT_DATA.typeContainer;
            this.dataDetail["isoCode"] = this.ELEMENT_DATA.isoCode;
            this.dataDetail["dateOfEntryContainer"] = formatDate(this.ELEMENT_DATA.dateOfContainerEntry,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            this.dataDetail["idContainer"] = this.ELEMENT_DATA.idContainer;
            this.dataDetail["size"] = this.ELEMENT_DATA.size;
            this.dataDetail["tareWeight"] = this.ELEMENT_DATA.tareWeight;
            this.dataDetail["maxWeight"] = this.ELEMENT_DATA.maxWeight;
            this.dataDetail["transportaLicense"] = this.ELEMENT_DATA.transportEntryLicensePlate;
        }
      );
    }
    else{
      console.log('idEntryForm rỗng');
    }   
  }

  UpdateStatus(status: number)
  {
    this.status = status;
    let width: string = '300px';
    let susscess: boolean = true;
    let title: any = '';
    let content: any = '';
    let typeNotification: number = 1;
    if(status == 1)
    {
      width = '400px';
      title = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'ConfirmApproval')?.label.toString(); 
    }
    else if (status == -1)
    {
      
      width = '400px';
      title = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'ConfirmRejection')?.label.toString(); 
    }
    console.log("idEntryForm" + this.idEntryForm);
    
    this.GetNotification(title,content,typeNotification,width,susscess);
  }

  GetNotification(title: any, content: any, typeNotification : number, width: string, susscess: boolean)
  {
    this.dataService.setData({TilteThongBao: title, idEntryForm: this.idEntryForm, NoiDungThongBao : content, LoaiThongBao: typeNotification,status: this.status, idUser : this.idUser});
    this.openDialog('0ms', '0ms',width,susscess);
    console.log("idEntryForm" + this.idEntryForm);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,width: string,susscess: boolean): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: width,
      enterAnimationDuration,
      exitAnimationDuration,
      data: {idEntryForm :this.idEntryForm, trangThai: this.status}
    });

    if(susscess == true)
    {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) // nếu chọn No là undefined
        {
            this.api.putDetailsPhieuNhap(this.idEntryForm,this.status).subscribe({
              next: (response) => {
                console.log('Cập nhật thành công:', response);   
                let title = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
                let content = this.dataNotice.find(n => n.field === 'UpdateStatusSuccess')?.label.toString(); 
                this.GetNotification(title,content,2,'400px',false);       
                this.ReturnEntryPage();
              },
              error: (error) => {
                let title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
                let content = this.dataNotice.find(n => n.field === 'ApprovalError')?.label.toString(); 
                this.GetNotification(title,content,2,'400px',false);
              }
            });
          console.log(result.idEntryForm);
          console.log(this.idEntryForm + this.status);
        }
        else
        {
          this.status = 0;
          console.log(result.idEntryForm);
        }
      });
    }
  } 

  ReturnEntryPage()
  {
    this.router.navigate(['/mainApp/EntryContainerForm'])
  }
  
}

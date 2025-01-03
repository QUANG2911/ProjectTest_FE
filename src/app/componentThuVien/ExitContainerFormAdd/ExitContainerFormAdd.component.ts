import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,ViewChild,inject, model } from '@angular/core';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { Router } from '@angular/router';


import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';


import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { FormatDateService } from '../../Service/FormatDateSevice';


//khai báo table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


// khai báo sort
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort,MatSortModule } from '@angular/material/sort';
import { ContainerInSnpList } from '../../Model/ContainerInSnpList.model';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {selectList } from '../../Model/SelectList.model';
import {ExitContainerFormToCreateNew } from '../../Model/ExitContainerFormToCreateNew.model';
import { Notification, Title } from '../../Key/KeyThongBao';

@Component({
  selector: 'app-add-phieu-xuat',
  imports: [MatStepperModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            CommonModule,
            MatSelectModule,
            MatTimepickerModule,
            MatDatepickerModule,
            MatTableModule,
            MatPaginator, MatPaginatorModule,
            MatSort, MatSortModule,
            MatCardModule, MatCheckboxModule, FormsModule],
  templateUrl: './ExitContainerFormAdd.component.html',
  styleUrl: './ExitContainerFormAdd.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExitContainerFormAddComponent implements OnInit{
    

  constructor( 
      private dataService: DataService,
      private api: ApiService,
      private router: Router,
      private formatDate: FormatDateService,
    ){
    }

  idUser: string ="";

  exitContainerFormToCreateNew!: ExitContainerFormToCreateNew;

  ELEMENT_DATA: ContainerInSnpList[] = [];

  displayedColumns: string[] = ['idContainer','size','typeContainerName','dateOfEntryContainer','choose'];
  dataSource: any;             

  idContainer: string = "";

  originalData: ContainerInSnpList[] = []; 
  
  private _liveAnnouncer = inject(LiveAnnouncer);

   // hàm sắp xếp
   @ViewChild(MatSort) sort!: MatSort;

   //hàm list page
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // keyDetail = Detail;
   
  dataNotice = Notification;
  dataTilte = Title;

  ////////////check box////////////
  dsSelectContainer : selectList[] =[];
  selectALL = false;
  itemsToShow: number[] = [];

  
   private _formBuilder = inject(FormBuilder);

   private transportType: string = "";

   readonly dialog = inject(MatDialog);
    // mũi tên hiện sắp xếp
    announceSortChange(sortState: Sort) {
     if (sortState.direction) {
       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
     } else {
       this._liveAnnouncer.announce('Sorting cleared');
     }
   }

  getDataFormExitForm()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe(data =>{
      if(data != null)  
      {
        this.idUser = data.idUser;
      }        
      else 
        console.log("Không có idUser truyền qua");
    })
  }

  ngOnInit(): void {
    this.getDataFormExitForm();
    this.getContainerInSnp(this.idUser);
    this.setItemsToShow(this.transportType);
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500); // Giả lập thời gian tải dữ liệu
  }
  
  getContainerInSnp(idUser: string)
  {
    this.api.GetDsContainerCuaKhChuaXuat(idUser)
    .subscribe(
      (data) => {
        if(data != null)
        {
          console.log(data);
          this.ELEMENT_DATA = data as ContainerInSnpList[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<ContainerInSnpList>(this.ELEMENT_DATA);

        }           
        else console.log('Không nhận được dữ liệu');        
      }
    ); 
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    checkBox: new FormControl(false)
  });

  GetTransportType(inputTransportType: any)
  {
    this.transportType = inputTransportType.value;
    // console.log(this.transportType);

    this.setItemsToShow(this.transportType);
  }

  setItemsToShow(transportType: any) {
    if (transportType == 'Tàu') {
      this.itemsToShow = [1]; 
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }

  checkAllIfSelected()
  {
    if(this.selectALL == false) 
    {
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
        checkBox: new FormControl(true)
      });
      this.selectALL = true

      this.ELEMENT_DATA.forEach(element => {
        this.dsSelectContainer.push({id: element.id,size:element.size});
      });
    }
    else
    {
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
        checkBox: new FormControl(false)
      });
      this.selectALL = false

      this.dsSelectContainer = [];
    }
    
    console.log(this.dsSelectContainer);
  }

  checkIfSelected(id : number, size: number)
  {
    const index = this.dsSelectContainer.findIndex(p=> p.id == id)

    console.log(this.dsSelectContainer);
    let total:  number = 0;
    // console.log("total ban đầu:" + t)
    if(index != -1)
    {
      this.dsSelectContainer = this.dsSelectContainer.splice(index,1);
      total = this.dsSelectContainer.reduce((sum,item) => sum + item.size,0) - size;
      console.log("khi bỏ chọn:" +total);
    }
    else
    {
      this.dsSelectContainer.splice(this.dsSelectContainer.length,0,{id:id,size:size});
      total = this.dsSelectContainer.reduce((sum,item) => sum + item.size,0);
    }
  
    if(this.transportType == 'Xe' && total > 40)
    {
      let title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      let content = this.dataNotice.find(n => n.field === 'TransportTypeErrorSize')?.label.toString(); 
      this.GetNotification(title,content,2,'500px',false);  
    }
  }

  FetchDataForApi(inputDateOfExit: any, inputTimeOfExit: any,inputTransportLiscence: any, inputTransportType: any)
  {
    
    const thoiGianXuat =  this.formatDate.combineDateAndTime(inputDateOfExit.value,inputTimeOfExit.value) as Date;
    
    const currentData = new Date();    

    for(let i = 0; i< this.dsSelectContainer.length;i++)
    {
      this.idContainer = this.dsSelectContainer[i].id + "," +this.idContainer;
    }

    let width: string = '300px';
    let susscess: boolean = false;
    let title: any = '';
    let content: any = '';
    let typeNotification: number = 2;

    if (inputDateOfExit.value === '' || inputTimeOfExit.value === '' ||inputTransportLiscence.value === '' || inputTransportType.value === '')
    {
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'MissingInfo')?.label.toString();
    }
    else if(thoiGianXuat.getTime() <= currentData.getTime())
    {
      width = '500px';
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'ExitErrorDate')?.label.toString(); 
    }
    else if(this.dsSelectContainer.length == 0)
    {
      width = '500px';
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'AmountContainerExitError')?.label.toString(); 
    }
    else{
      this.exitContainerFormToCreateNew = new ExitContainerFormToCreateNew(
                                            thoiGianXuat,                                        
                                            inputTransportLiscence.value,
                                            inputTransportType.value,);
      console.log(this.exitContainerFormToCreateNew);
      title = this.dataTilte.find(n => n.field === 'Create')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'ConfirmCreateOrder')?.label.toString(); 
      width = '300px';
      typeNotification = 1;      
      susscess = true;
    }
    this.GetNotification(title,content,typeNotification,width,susscess);
  }

  GetNotification(title: any, content: any, typeNotification : number, width: string, susscess: boolean)
  {
    this.dataService.setData({TilteThongBao: title, maNhap: "", NoiDungThongBao : content, LoaiThongBao: typeNotification,idUser: this.idUser,idContainer:this.idContainer });
    this.openDialogApi('0ms', '0ms',width,susscess);
  }

  openDialogApi(enterAnimationDuration: string, exitAnimationDuration: string, width: string, susscess: boolean): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: width,
      enterAnimationDuration,
      exitAnimationDuration,
    });

    if(susscess == true)
    {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) // nếu chọn No là undefined
        {
          console.log("tạo thành công");
          this.api.postNewPhieuXuat(this.idUser,this.idContainer,this.exitContainerFormToCreateNew).subscribe(
            (reponse) => {
              console.log("Api thành công: "+reponse);
              let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
              let content: any = this.dataNotice.find(n => n.field === 'CreateSuccess')?.label.toString();
              this.GetNotification(title,content,2,'400px',false);
              this.router.navigate(['/mainApp/ExitContainerForm']);
            },
            (error) =>{
              let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
              let content: any = this.dataNotice.find(n => n.field === 'CreateFail')?.label.toString();
              this.GetNotification(title,content,2,'400px',false);
            }
          );
        }
        else
        {
          console.log("xem xét tiếp")
        }
      });
    }
  } 
}

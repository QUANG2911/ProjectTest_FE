import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,inject } from '@angular/core';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { Router } from '@angular/router';


import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';


import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { EntryContainerFormInformation } from '../../Model/EntryContainerFormInformation.model';
import { FormatDateService } from '../../Service/FormatDateSevice';
import { ContainerType } from '../../Model/ContainerType.model';
import { Notification, Title } from '../../Key/KeyThongBao';



@Component({
  selector: 'app-add-phieu-nhap',
  imports: [ MatStepperModule,
              FormsModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatButtonModule,
              CommonModule,
              MatSelectModule,
              MatTimepickerModule,
              MatDatepickerModule],
  templateUrl: './EntryContainerFormAdd.component.html',
  styleUrl: './EntryContainerFormAdd.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryContainerFormAddComponent implements OnInit{

  constructor( 
                private dataService: DataService,
                private api: ApiService,
                private router: Router,
                private formatDate: FormatDateService
              ){}

  idUser: string ="";
  
  inputEntryInformation!: EntryContainerFormInformation;

  TYPECONTAINER_DATA: ContainerType[] = [];

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  readonly dialog = inject(MatDialog);

  dataNotice = Notification;
  dataTilte = Title;

  getDataFromEntryContainerPage()
  {
     this.dataService.getData();
     this.dataService.currentData.subscribe(data =>{
      if(data != null)  
        this.idUser = data.idUser;
      else 
        console.log("Không có idUser truyền qua");
     })

     this.api.getContainerType().subscribe((data) =>
      {
        this.TYPECONTAINER_DATA = data as ContainerType[];
      })
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();

    this.getDataFromEntryContainerPage()
  }

  GetContainerSizeByIsoCode(sizeType: number): number
  {
    if(sizeType == 2)
    {
      return 20;
    }
    else if(sizeType == 4)
    {
      return 40;
    }
    return 45;
  }

  CheckContainerSize(inputSize: any,InputIsoCode: any)
  {
    let kiTuDauIso = InputIsoCode.value[0] as number;
    
    let kichThuoc = inputSize.value as number;
    
    let kichThuocIso = this.GetContainerSizeByIsoCode(kiTuDauIso);

    if(kichThuoc != kichThuocIso)
    {
      let width: string = '400px';
      let susscess: boolean = false;
      let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
      let content: any = this.dataNotice.find(n => n.field === 'IsoErrorSizeContainer')?.label.toString();
      let typeNotification: number = 2;
      this.GetNotification(title,content,typeNotification,width,susscess);
    }
  }

  CheckContainerType(inputTypeContainer: any,inpuIsoCode: any)
  {
    let kiTuBaIso = inpuIsoCode.value[2] ;
    
    if(kiTuBaIso != inputTypeContainer.value){
      let width: string = '400px';
      let susscess: boolean = false;
      let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
      let content: any = this.dataNotice.find(n => n.field === 'IsoErrorTypeContainer')?.label.toString();
      let typeNotification: number = 2;
      this.GetNotification(title,content,typeNotification,width,susscess);
    }
  }

  FetchDataForApi(inputNumContainer: any,inputIsoCode: any,inputTareWeight: any,inputMaxWeight: any, inputTypeContainer: any,inputSize: any, inputDateOfManufacture: any,inputDateOfEntryContainer: any, inputTimeOfEntryContainer: any,inputTransportEntryLicensePlate: any, inputTransportType: any){
    const thoiGianToi =  this.formatDate.combineDateAndTime(inputDateOfEntryContainer.value,inputTimeOfEntryContainer.value) as Date;
    const thoiGianSx = this.formatDate.combineDateAndTime(inputDateOfManufacture.value,"00:00") as Date;
    const currentData = new Date();
    console.log(inputNumContainer);

    let width: string = '300px';
    let susscess: boolean = false;
    let title: any = '';
    let content: any = '';
    let typeNotification: number = 2;
    
    if (inputNumContainer.value=== "" ||inputIsoCode.value=== "" ||inputTareWeight.value=== "" ||inputMaxWeight.value=== "" || inputTypeContainer.value=== ""||inputSize.value=== "" ||inputDateOfManufacture.value=== "" ||inputDateOfEntryContainer.value=== "" || inputTimeOfEntryContainer.value=== "" ||inputTransportEntryLicensePlate.value === "" || inputTransportType.value === "")
    { 
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'MissingInfo')?.label.toString();
    }
    else if (thoiGianSx.getTime() >= currentData.getTime())
    {
      width = '500px';
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'InvalidProductionDate')?.label.toString(); 
    }
    else if(thoiGianToi.getTime() <= currentData.getTime())
    {
      width = '600px';
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'InvalidDeliveryDate')?.label.toString(); 
    }
    else{
      this.inputEntryInformation = new EntryContainerFormInformation(
                                                  0,
                                                  '',
                                                  inputNumContainer.value,
                                                  inputIsoCode.value,
                                                  inputTypeContainer.value,
                                                  thoiGianToi,
                                                  inputSize.value,                                    
                                                  inputTareWeight.value,
                                                  inputMaxWeight.value,
                                                  inputTransportEntryLicensePlate.value,
                                                  inputTransportType.value,
                                                  '',
                                                  thoiGianSx);
        console.log(this.inputEntryInformation);
        width = '300px';
        title = this.dataTilte.find(n => n.field === 'Create')?.label.toString();
        content = this.dataNotice.find(n => n.field === 'ConfirmCreateOrder')?.label.toString(); 
        typeNotification = 1;      
        susscess = true;
      }
      this.GetNotification(title,content,typeNotification,width,susscess);
  }

  GetNotification(title: string, content: string, typeNotification : number, width: string, susscess: boolean)
  {
    this.dataService.setData({TilteThongBao: title, maNhap: "", NoiDungThongBao : content, LoaiThongBao: typeNotification,idUser: this.idUser});
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
          this.api.postNewPhieuNhap(this.idUser,this.inputEntryInformation).subscribe(
            (reponse) => {
              console.log("Api thành công: "+reponse);
              let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
              let content: any = this.dataNotice.find(n => n.field === 'CreateSuccess')?.label.toString();
              this.GetNotification(title,content,2,'400px',false);
              this.router.navigate(['/mainApp/EntryContainerForm']);
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

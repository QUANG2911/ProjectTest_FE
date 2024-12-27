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
      let title: string = "Cảnh báo";
      let content: string = "Thông tin kích thước và loại mã Iso chọn không hợp lệ";
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
      let title: string = "Cảnh báo";
      let content: string = "Thông tin loại và loại mã Iso chọn không hợp lệ";
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
    let title: string = '';
    let content: string = '';
    let typeNotification: number = 2;
    
    if (inputNumContainer.value=== "" ||inputIsoCode.value=== "" ||inputTareWeight.value=== "" ||inputMaxWeight.value=== "" || inputTypeContainer.value=== ""||inputSize.value=== "" ||inputDateOfManufacture.value=== "" ||inputDateOfEntryContainer.value=== "" || inputTimeOfEntryContainer.value=== "" ||inputTransportEntryLicensePlate.value === "" || inputTransportType.value === "")
    { 
      title = "Cảnh báo";
      content = "Bạn vui lòng điền đầy đủ thông tin";
    }
    else if (thoiGianSx.getTime() >= currentData.getTime())
    {
      title = "Cảnh báo";
      width = '500px';
      content = "Bạn vui lòng điền lại ngày sản xuất không thể lớn hơn ngày hiện tại";  
    }
    else if(thoiGianToi.getTime() <= currentData.getTime())
    {
      title = "Cảnh báo";
      width = '600px';
      content = "Bạn vui lòng điền lại ngày giao container không thể nhỏ hơn hay bằng ngày hiện tại";   
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
        title = "Tạo phiếu";
        width = '300px';
        content = "Bạn có chắc muốn tạo đơn này";
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
          console.log("tạo thành công");
          this.api.postNewPhieuNhap(this.idUser,this.inputEntryInformation).subscribe(
            (reponse) => {
              console.log("Api thành công: "+reponse);
              this.GetNotification("Thông báo","Tạo phiếu nhập thành công",2,'400px',false);
              this.router.navigate(['/mainApp/EntryContainerForm']);
            },
            (error) =>{
                console.log("Lỗi api post: " +error);
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

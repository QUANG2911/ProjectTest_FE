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
import { DetailPhieuNhap } from '../../Model/DetailPhieuNhap.model';
import { FormatDateService } from '../../Service/FormatDateSevice';
import { loaiContainer } from '../../Model/LoaiContainer.model';



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
  templateUrl: './add-phieu-nhap.component.html',
  styleUrl: './add-phieu-nhap.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPhieuNhapComponent implements OnInit{

  constructor( 
                private dataService: DataService,
                private api: ApiService,
                private router: Router,
                private formatDate: FormatDateService
              ){}

  idUser: string ="";
  
  InputPhieuNhap!: DetailPhieuNhap;

  LOAI_DATA: loaiContainer[] = [
    // {maloai: 'U', tenloai: 'CONTAINER KHÔ'},
    // {maloai: 'F',	tenloai: 'Container phẳng'},
    // {maloai: 'R', tenloai: 'Container Lạnh'},
    // {maloai: 'S',	tenloai: 'Container mở nắp'}
  ]

  getDulieuDsPhieuNhap()
  {
     this.dataService.getData();
     this.dataService.currentData.subscribe(data =>{
      if(data != null)  
        this.idUser = data.idUser;
      else 
        console.log("Không có idUser truyền qua");
     })

     this.api.getLoaiContainer().subscribe((data) =>
      {
        this.LOAI_DATA = data as loaiContainer[];
      })
  }


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();

    this.getDulieuDsPhieuNhap()
  }

  TraSizeDuaTrenISO(loaiKichThuoc: number): number
  {
    if(loaiKichThuoc == 2)
    {
      return 20;
    }
    else if(loaiKichThuoc == 4)
    {
      return 40;
    }
    return 45;
  }

  CheckThongTinIsoVoiSize(inputKichThuoc: any,inputMaISO: any)
  {
    let kiTuDauIso = inputMaISO.value[0] as number;
    
    let kichThuoc = inputKichThuoc.value as number;
    
    let kichThuocIso = this.TraSizeDuaTrenISO(kiTuDauIso);

    if(kichThuoc != kichThuocIso)
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Thông tin kích thước và loại mã Iso chọn không hợp lệ", LoaiThongBao: 2, idUser: this.idUser});
      this.openDialog('0ms', '0ms');    
    }
  }

  CheckThongTinIsoVoiLoai(inputLoai: any,inputMaISO: any)
  {
    let kiTuBaIso = inputMaISO.value[2] ;
    
    if(kiTuBaIso != inputLoai.value){
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Thông tin loại và loại mã Iso chọn không hợp lệ", LoaiThongBao: 2, idUser: this.idUser});
      this.openDialog('0ms', '0ms');  
    }

  }

  LAYSOLIEU(inputNumContainer: any,inputMaISO: any,inputRongWeight: any,inputTongWeight: any, inputLoai: any,inputKichThuoc: any, InputNgaySx: any,InputNgayToiCang: any, InputThoiGianToi: any,inputBienSo: any, inputPhuongTienVanChuyen: any){
    const thoiGianToi =  this.formatDate.combineDateAndTime(InputNgayToiCang.value,InputThoiGianToi.value) as Date;
    const thoiGianSx = this.formatDate.combineDateAndTime(InputNgaySx.value,"00:00") as Date;
    const currentData = new Date();
    console.log(inputLoai.value);
    if (inputNumContainer=== "" ||inputMaISO=== "" ||inputRongWeight=== "" ||inputTongWeight=== "" || inputLoai=== ""||inputKichThuoc=== "" ||InputNgaySx=== "" ||InputNgayToiCang=== "" || InputThoiGianToi=== "" ||inputBienSo === "" || inputPhuongTienVanChuyen === "")
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng điền đầy đủ thông tin", LoaiThongBao: 2,idUser: this.idUser});
      this.openDialog('0ms', '0ms');      
    }
    else if (thoiGianSx.getTime() >= currentData.getTime())
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng điền lại ngày sản xuất không thể lớn hơn ngày hiện tại", LoaiThongBao: 2, idUser: this.idUser});
      this.openDialog('0ms', '0ms');     
    }
    else if(thoiGianToi.getTime() <= currentData.getTime())
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng điền lại ngày giao container không thể nhỏ hơn hay bằng ngày hiện tại", LoaiThongBao: 2,idUser: this.idUser});
      this.openDialog('0ms', '0ms');     
    }
    else{
      this.InputPhieuNhap = new DetailPhieuNhap(
                                                  0,
                                                  '',
                                                  inputNumContainer.value,
                                                  inputMaISO.value,
                                                  inputLoai.value,
                                                  thoiGianToi,
                                                  inputKichThuoc.value,                                    
                                                  inputRongWeight.value,
                                                  inputTongWeight.value,
                                                  inputBienSo.value,
                                                  inputPhuongTienVanChuyen.value,
                                                  '',
                                                  thoiGianSx);
        console.log(this.InputPhieuNhap);
        this.dataService.setData({TilteThongBao: "Tạo phiếu", maNhap: "", NoiDungThongBao : "Bạn có chắc muốn tạo đơn này", LoaiThongBao: 1,idUser: this.idUser});
        this.openDialogApi('0ms', '0ms');
   }
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogOut(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  
  openDialogApi(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) // nếu chọn No là undefined
      {
        console.log("tạo thành công");
        this.api.postNewPhieuNhap(this.idUser,this.InputPhieuNhap).subscribe(
          (reponse) => {
            console.log("Api thành công: "+reponse);
            this.dataService.setData({TilteThongBao: "Thông báo", maNhap: "", NoiDungThongBao : "Tạo đơn phiếu mới thành công", LoaiThongBao: 2,idUser: this.idUser});
            this.openDialogOut('0ms', '0ms');
            this.router.navigate(['/mainApp/phieuNhapcontainer']);
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

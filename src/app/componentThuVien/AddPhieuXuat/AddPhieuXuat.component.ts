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
import { DsContainerChuaXuat } from '../../Model/DsContainerChuaXuat.model';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {selectList } from '../../Model/SelectList.model';
import {ThongTinPhieuXuat } from '../../Model/ThongTinPhieuXuat.model';

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
  templateUrl: './AddPhieuXuat.component.html',
  styleUrl: './AddPhieuXuat.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddPhieuXuatComponent implements OnInit{
    

  constructor( 
      private dataService: DataService,
      private api: ApiService,
      private router: Router,
      private formatDate: FormatDateService,
    ){
    }

  idUser: string ="";

  InputPhieuXuat!: ThongTinPhieuXuat;

  ELEMENT_DATA: DsContainerChuaXuat[] = [];

  displayedColumns: string[] = ['macontainer','size','tenloai','typeContainerName','choose'];
  dataSource: any;             

  idContainer: string = "";

  originalData: DsContainerChuaXuat[] = []; 
  
  private _liveAnnouncer = inject(LiveAnnouncer);

   // hàm sắp xếp
   @ViewChild(MatSort) sort!: MatSort;

   //hàm list page
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   // keyDetail = Detail;
   
    // mũi tên hiện sắp xếp
    announceSortChange(sortState: Sort) {
     if (sortState.direction) {
       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
     } else {
       this._liveAnnouncer.announce('Sorting cleared');
     }
   }

  getDulieuDsPhieuNhap()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe(data =>{
      if(data != null)  
      {
        this.idUser = data.idUser;
        this.idContainer = data.idContainer;
      }        
      else 
        console.log("Không có idUser truyền qua");
    })
  }
  private _formBuilder = inject(FormBuilder);
  private loaiPhuongTienVanChuyen: string = "";

  ngOnInit(): void {
    this.getDulieuDsPhieuNhap();
    this.getContainerChuaXuat(this.idUser);
    this.setItemsToShow(this.loaiPhuongTienVanChuyen);
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500); // Giả lập thời gian tải dữ liệu
  }
  
  getContainerChuaXuat(idUser: string)
  {
    this.api.GetDsContainerCuaKhChuaXuat(idUser)
    .subscribe(
      (data) => {
        if(data != null)
        {
          console.log(data);
          this.ELEMENT_DATA = data as DsContainerChuaXuat[];

          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<DsContainerChuaXuat>(this.ELEMENT_DATA);

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

  ////////////check box////////////
  dsSelectContainer : selectList[] =[];
  selectALL = false;
  itemsToShow: number[] = [];

  LuuThongTinDonViVanChuyen(inputPhuongTienVanChuyen: any)
  {
    this.loaiPhuongTienVanChuyen = inputPhuongTienVanChuyen.value;
    // console.log(this.loaiPhuongTienVanChuyen);

    this.setItemsToShow(this.loaiPhuongTienVanChuyen);
  }

  setItemsToShow(loaiPhuongTienVanChuyen: any) {
    if (loaiPhuongTienVanChuyen == 'Tàu') {
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
  
    if(this.loaiPhuongTienVanChuyen == 'Xe' && total > 40)
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Với loại hình phương tiện xe chỉ được xuất container dưới 40 feet trên 1 truyến", LoaiThongBao: 2, idUser: this.idUser});
      this.openDialog('0ms', '0ms');  
    }
  }

  //////////////////////////


  LAYSOLIEU(InputNgayXuat: any, InputThoiGianXuat: any,inputBienSo: any, inputPhuongTienVanChuyen: any)
  {
    
    const thoiGianXuat =  this.formatDate.combineDateAndTime(InputNgayXuat.value,InputThoiGianXuat.value) as Date;
    
    const currentData = new Date();    

    for(let i = 0; i< this.dsSelectContainer.length;i++)
    {
      this.idContainer = this.dsSelectContainer[i].id + "," +this.idContainer;
    }
    console.log(this.dsSelectContainer);
    console.log(this.idContainer);

    if (InputNgayXuat== null || InputThoiGianXuat== null ||inputBienSo == null || inputPhuongTienVanChuyen == null)
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng điền đầy đủ thông tin", LoaiThongBao: 2,idUser: this.idUser,idContainer:this.idContainer});
      this.openDialog('0ms', '0ms');      
    }
    else if(thoiGianXuat.getTime() <= currentData.getTime())
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng điền lại ngày xuất container không thể nhỏ hơn hay bằng ngày hiện tại", LoaiThongBao: 2,idUser: this.idUser,idContainer:this.idContainer});
      this.openDialog('0ms', '0ms');     
    }
    else if(this.dsSelectContainer.length == 0)
    {
      this.dataService.setData({TilteThongBao: "Cảnh báo", maNhap: "", NoiDungThongBao : "Bạn vui lòng chọn số lượng container muốn xuất", LoaiThongBao: 2,idUser: this.idUser,idContainer:this.idContainer});
      this.openDialog('0ms', '0ms');   
    }
    else{
      this.InputPhieuXuat = new ThongTinPhieuXuat(
                                            thoiGianXuat,                                        
                                            inputBienSo.value,
                                            inputPhuongTienVanChuyen.value,);
      console.log(this.InputPhieuXuat);
      this.dataService.setData({TilteThongBao: "Tạo phiếu", maNhap: "", NoiDungThongBao : "Bạn có chắc muốn tạo đơn này", LoaiThongBao: 1,idUser: this.idUser,idContainer:this.idContainer });
      this.openDialogApi('0ms', '0ms');
    }
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '600px',
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
       
        console.log(this.idContainer);
        this.api.postNewPhieuXuat(this.idUser,this.idContainer,this.InputPhieuXuat).subscribe(
          (reponse) => {
            console.log("Api thành công: "+reponse);
            this.dataService.setData({TilteThongBao: "Thông báo", maNhap: "", NoiDungThongBao : "Tạo đơn phiếu mới thành công", LoaiThongBao: 2,idUser: this.idUser});
            this.openDialogOut('0ms', '0ms');
            this.router.navigate(['/mainApp/phieuXuatContainer']);
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

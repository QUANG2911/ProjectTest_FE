
import { DataService } from '../../Service/DataService';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { ContainerTransport, Detail } from '../../Key/KeyThongTinContainer';
import { ApiService } from '../../Service/ApiService';
import { DetailContainer } from '../../Model/DetailContainer.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detail-container',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule],
  templateUrl: './detail-container.component.html',
  styleUrl: './detail-container.component.css'
})
export class DetailContainerComponent implements OnInit {


  ELEMENT_DATA!: DetailContainer ;

  dataDetail: { [key: string]: string | number |Date}={};

  keyDetail = Detail;
  
  keyTrans = ContainerTransport.filter(p => p.field === 'ngayditoivitri' || p.field === 'donViDuaToiCang' || p.field == 'donViXuatCang' || p.field == 'ngayxuatcang'  || p.field == 'tinhTrang' || p.field == 'viTriHienTai');
  maContainer : any; // lấy dữ liệu của API gửi lên
  ngayToi : Date = new Date() ;
  id : number = 0;
  constructor(
              private dataService :DataService,
              private api :ApiService,
              private router: Router
             ){}

  getDuLieuTuDsContainer()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data && data.maContainer) {  // Kiểm tra data và maContainer
        this.maContainer = data.maContainer;
        this.ngayToi = data.ngaytoi;
        this.id = data.id;
      }
      else {
        console.error('Data or maContainer không có');
      }
    });
  }
  ngOnInit(): void {      
      this.getDuLieuTuDsContainer();
      this.getDetailsContainer(this.id, this.ngayToi);

  }

  getDetailsContainer(id : number, ngayditoivitri : Date)
  {
    if(id != 0)
    {
      this.api.getDetailsContainer(id,ngayditoivitri).subscribe(
        (data) =>{          
            this.ELEMENT_DATA = data as DetailContainer;
            this.dataDetail["donViDuaToiCang"] = this.ELEMENT_DATA.donViDuaToiCang;
            this.dataDetail["donViXuatCang"] = this.ELEMENT_DATA.donViXuatCang;
            this.dataDetail["loaiContainer"] = this.ELEMENT_DATA.loaiContainer;
            this.dataDetail["maIso"] = this.ELEMENT_DATA.maIso;
            this.dataDetail["ngayditoivitri"] = formatDate(this.ELEMENT_DATA.ngayDiToiViTri,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            if(this.ELEMENT_DATA.ngayXuatCang)
            {
              this.dataDetail["ngayxuatcang"] =  formatDate(this.ELEMENT_DATA.ngayXuatCang,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            }else
            {
              this.dataDetail["ngayxuatcang"] =  this.ELEMENT_DATA.ngayXuatCang;
            }            
            this.dataDetail["numcontainer"] = this.ELEMENT_DATA.numContainer;
            this.dataDetail["size"] = this.ELEMENT_DATA.size;
            this.dataDetail["tinhTrang"] = this.ELEMENT_DATA.tinhTrang;
            this.dataDetail["viTriHienTai"] = this.ELEMENT_DATA.viTriHienTai;
            this.dataDetail["trongLuongRong"] = this.ELEMENT_DATA.trongLuongRong;
            this.dataDetail["trongLuongTong"] = this.ELEMENT_DATA.trongLuongTong;

            console.log(this.dataDetail);
        }
      );
    }
    else{
      console.log('macontainer rỗng');
    }   
  }

  TroVePageChinh()
  {
    this.router.navigate(['/mainApp/container']);
  }
}


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
  templateUrl: './ContainerDetail.component.html',
  styleUrl: './ContainerDetail.component.css'
})
export class DetailContainerComponent implements OnInit {


  ELEMENT_DATA!: DetailContainer ;

  dataDetail: { [key: string]: string | number |Date}={};

  keyDetail = Detail;
  
  keyTrans = ContainerTransport.filter(p => p.field === 'dateOfEntryContainer' || p.field === 'transportEntyType' || p.field == 'transportExistType' || p.field == 'dateOfExitContainer'  || p.field == 'status' || p.field == 'containerLocation');
  idContainer : any; // lấy dữ liệu của API gửi lên
  dateOfEntryContainer : Date = new Date() ;
  id : number = 0;
  constructor(
              private dataService :DataService,
              private api :ApiService,
              private router: Router
             ){}

  getDataFormContainerPage()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data && data.idContainer) {  // Kiểm tra data và idContainer
        this.idContainer = data.idContainer;
        this.dateOfEntryContainer = data.dateOfEntryContainer;
        this.id = data.id;
      }
      else {
        console.error('Data or idContainer không có');
      }
    });
  }
  ngOnInit(): void {      
      this.getDataFormContainerPage();
      this.getDetailsContainer(this.id, this.dateOfEntryContainer);
  }

  getDetailsContainer(id : number, dateOfEntryContainer : Date)
  {
    if(id != 0)
    {
      this.api.getDetailsContainer(id,dateOfEntryContainer).subscribe(
        (data) =>{         
          console.log(data); 
            this.ELEMENT_DATA = data as DetailContainer;
            this.dataDetail["transportEntyType"] = this.ELEMENT_DATA.transportEntryType;
            this.dataDetail["transportExistType"] = this.ELEMENT_DATA.transportExitType;
            this.dataDetail["containerType"] = this.ELEMENT_DATA.typeContainer;
            this.dataDetail["isoCode"] = this.ELEMENT_DATA.isoCode;
            this.dataDetail["dateOfEntryContainer"] = formatDate(this.ELEMENT_DATA.dateOfEntryContainer,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            if(this.ELEMENT_DATA.dateOfExitContainer != null)
            {
              this.dataDetail["dateOfExitContainer"] =  formatDate(this.ELEMENT_DATA.dateOfExitContainer,'dd-MM-YYYY, giờ: HH:mm:ss','en-US');
            }else
            {
              this.dataDetail["dateOfExitContainer"] =  this.ELEMENT_DATA.dateOfExitContainer;
            }            
            this.dataDetail["numcontainer"] = this.ELEMENT_DATA.numContainer;
            this.dataDetail["size"] = this.ELEMENT_DATA.size;
            this.dataDetail["status"] = this.ELEMENT_DATA.statusOfContainer;
            this.dataDetail["containerLocation"] = this.ELEMENT_DATA.locationContainer;
            this.dataDetail["tareWeight"] = this.ELEMENT_DATA.tareWeight;
            this.dataDetail["maxWeight"] = this.ELEMENT_DATA.maxWeight;

            console.log(this.dataDetail);
        }
      );
    }
    else{
      console.log('idContainer rỗng');
    }   
  }

  ReturnContainerPage()
  {
    this.router.navigate(['/mainApp/container']);
  }
}

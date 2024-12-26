import { AfterViewInit, ChangeDetectionStrategy,Component, OnInit, ViewChild, inject } from '@angular/core';
import { DsContainer } from '../../Model/DsContainer.model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
//khai báo format bên html
import { CommonModule } from '@angular/common';
//khai báo thư viện sài cho table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//khai báo sort sắp xếp
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';

//khai báo route
import {RouterModule} from '@angular/router'; // dung routerLink

//khai bao ham con lay dữ liệu
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';



@Component({
  selector: 'app-container',
  imports: [CommonModule, MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule, MatFormFieldModule, FormsModule, RouterModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})


export class ContainerComponent implements OnInit, AfterViewInit{
  private _liveAnnouncer = inject(LiveAnnouncer);

  item!: string;

  constructor(private dataService :DataService,
              private api :ApiService,
             ){}
  
  ELEMENT_DATA: DsContainer[] = []
  
  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
         
  //Lấy dữ liệu từ API
  getListContainer(): void{
    this.isLoading = true;
    this.api.getContainers()
    .subscribe(
      (data) => {
        if(data.length > 0)
        {
          this.ELEMENT_DATA = data as DsContainer[];
          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<DsContainer>(this.ELEMENT_DATA);
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);
          
          this.isLoading = false;

        }           
        else console.log('Không nhận được dữ liệu');        
      }
    ); 
  }

  ngOnInit(): void {
    this.getListContainer();
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 400); // Giả lập thời gian tải dữ liệu
  }

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['id','macontainer', 'tenkh', 'sdt','ngayDiToiViTri','ngayXuatCang','action'];
  dataSource: any;             

  originalData: DsContainer[] = []; 
  
  
   // hàm sreach  
  SearchMaContainer(maContainer: any): void
  {
    this.item = maContainer.value;
    if(this.item != null)
    {
      //live
     this.dataSource.data = this.originalData.filter(p=>p.maContainer.toLowerCase().includes(this.item.toLowerCase()));
    }
    else {
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

  // ham chuyen page detail
   TransformDetailPageContainer(id: number,maContainer: any, ngayditoivitri: any): void{   
     this.dataService.setData({id: id, maContainer: maContainer, ngaytoi: ngayditoivitri})
   }

   

}

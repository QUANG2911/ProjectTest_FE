import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { DataService } from '../../../Service/DataService';


@Component({
  selector: 'app-thong-bao',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,CommonModule],
  templateUrl: './Notice.component.html',
  styleUrl: './Notice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThongBaoComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ThongBaoComponent>);


  constructor( private serviceData: DataService,
              ){};

  TilteThongBao: string ="";
  NoiDungThongBao: string = "";
  LoaiThongBao: number = 0;
  maPhieu :string ="";
  itemsToShow: number[] = [];

  LayThongTinTuComponentChinh()
  {
    //this.serviceData.getData();
    this.serviceData.currentData.subscribe((data) =>{
      if (data.maNhap === '' || data.maNhap === undefined)
        this.TilteThongBao = data.TilteThongBao;
      else
       this.TilteThongBao = data.TilteThongBao +" "+ data.maNhap;
       this.NoiDungThongBao = data.NoiDungThongBao;
       this.maPhieu = data.maPhieu;
       this.LoaiThongBao = data.LoaiThongBao;
    });
    this.setItemsToShow();
  }

  OnNoClick()
  {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.LayThongTinTuComponentChinh();
  }

  setItemsToShow() {
    if (this.LoaiThongBao == 1) {
      this.itemsToShow = [1]; // Hiển thị Button yes no
    } else if (this.LoaiThongBao == 2) {
      this.itemsToShow = [2]; // Hiển thị cả ok
    }
  }

  showItem(item: number): boolean {
    return this.itemsToShow.includes(item);
  }
}

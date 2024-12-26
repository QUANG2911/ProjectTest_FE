export class DsContainerChuaXuat {
    id!: number;
    maContainer!: string;
    tenLoai!: string;
    size!: number;      
    ngayGiaoContainer!: Date;
  
    constructor( id: number, maContainer: string,  tenLoai: string,  size: number, ngayGiaoContainer: Date)
    {
      this.id = id;
      this.maContainer = maContainer;
      this.tenLoai = tenLoai;
      this.size = size;
      this.ngayGiaoContainer = ngayGiaoContainer;
    }
  }

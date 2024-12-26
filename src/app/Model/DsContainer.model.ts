export class DsContainer {
    id!: number;
    maContainer!: string;
    numContainer!: string;
    tenKh!: string;
    sdt!: string;
    ngayDiToiViTri!: Date;
    ngayXuatCang!: Date;
  
    constructor( id: number,maContainer: string,  numContainer: string,  tenKh: string, sdt: string,  ngayDiToiViTri: Date,  ngayXuatCang: Date)
    {
      this.id = id;
      this.maContainer = maContainer;
      this.numContainer = numContainer;
      this.tenKh = tenKh;
      this.sdt = sdt;
      this.ngayDiToiViTri = ngayDiToiViTri;
      this.ngayXuatCang = ngayXuatCang;
    }
  }

  
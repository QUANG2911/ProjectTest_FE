export class DetailContainer {
      maContainer!: string;
      numContainer!: string;
      maIso!: string;
      loaiContainer!: string;
      ngayDiToiViTri!: Date;
      ngayXuatCang!: Date;
      size!: number;      
      trongLuongRong!: number;
      trongLuongTong!: string;
      viTriHienTai!: string;
      donViDuaToiCang!: string;
      donViXuatCang!: string;
      tinhTrang!: string;
    
      constructor( maContainer: string,  numContainer: string,  maIso: string, loaiContainer: string, ngayDiToiViTri: Date,  ngayXuatCang: Date, size: number, trongLuongRong: number, trongLuongTong: string, viTriHienTai: string,donViDuaToiCang: string,  donViXuatCang: string, tinhTrang: string)
      {
        this.maContainer = maContainer;
        this.numContainer = numContainer;
        this.maIso = maIso;
        this.loaiContainer = loaiContainer;
        this.ngayDiToiViTri = ngayDiToiViTri;
        this.size = size;
        this.trongLuongRong = trongLuongRong;
        this.trongLuongTong = trongLuongTong;
        this.viTriHienTai = viTriHienTai;
        this.ngayXuatCang = ngayXuatCang;
        this.donViDuaToiCang =donViDuaToiCang;
        this.donViXuatCang =donViXuatCang;
        this.tinhTrang = tinhTrang;
      }
    }
  
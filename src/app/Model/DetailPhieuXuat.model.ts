export class DetailPhieuXuat {
    maPhieuXuat!: string;
    maContainer!: string;
    isoCode!: string;
    tenLoai!: string;
    ngayXuat!: Date;
    size!: number;      
    sdt!: string;
    bienSoDonViVanChuyen!: string;
    donViXuatCang!: string;
    ngaygiaocontainer!: Date;
  
    constructor( maPhieuXuat: string, maContainer: string,  isoCode: string, tenLoai: string, ngayXuat: Date,  size: number,  sdt: string, bienSoDonViVanChuyen: string,donViXuatCang: string, ngaygiaocontainer: Date)
    {
      this.maPhieuXuat = maPhieuXuat;
      this.maContainer = maContainer;
      this.isoCode = isoCode;
      this.tenLoai = tenLoai;
      this.ngayXuat = ngayXuat;
      this.size = size;
      this.sdt = sdt;
      this.bienSoDonViVanChuyen = bienSoDonViVanChuyen;
      this.donViXuatCang = donViXuatCang;
      this.ngaygiaocontainer = ngaygiaocontainer;
    }
  }

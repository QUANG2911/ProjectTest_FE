export class DetailPhieuNhap {
    id!: number;
    maContainer!: string;
    numContainer!: string;
    maIso!: string;
    loaiContainer!: string;
    ngayVanChuyenToiCang!: Date;
    size!: number;      
    trongLuongRong!: number;
    tongTrongLuong!: string;
    bienSoDonViVanChuyen!: string;
    loaiHinhThucVanChuyen!: string;
    maPhieuNhap!: string;
    ngaySanXuat!: Date;
  
    constructor( id: number, maContainer: string,  numContainer: string,  maIso: string, loaiContainer: string, ngayVanChuyenToiCang: Date,  size: number, trongLuongRong: number, tongTrongLuong: string, bienSoDonViVanChuyen: string,loaiHinhThucVanChuyen: string,  maPhieuNhap: string,ngaySanXuat: Date)
    {
      this.id = id;
      this.maContainer = maContainer;
      this.numContainer = numContainer;
      this.maIso = maIso;
      this.loaiContainer = loaiContainer;
      this.ngayVanChuyenToiCang = ngayVanChuyenToiCang;
      this.size = size;
      this.trongLuongRong = trongLuongRong;
      this.tongTrongLuong = tongTrongLuong;
      this.bienSoDonViVanChuyen = bienSoDonViVanChuyen;
      this.loaiHinhThucVanChuyen =loaiHinhThucVanChuyen;
      this.maPhieuNhap = maPhieuNhap;
      this.ngaySanXuat = ngaySanXuat;
    }
  }

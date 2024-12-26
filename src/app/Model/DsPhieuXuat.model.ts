export class DsPhieuXuat {
    maPhieuXuat!: string;
    ngayLamPhieu!: string;
    ngayXuat!: Date;
    trangThaiDuyet!: number;
    tenKh!: string;
    sdt!: string;


    constructor( maPhieuXuat: string,  ngayLamPhieu: string,  trangThaiDuyet: number, tenKh: string, sdt: string,  ngayXuat: Date)
    {
        this.maPhieuXuat = maPhieuXuat;
        this.ngayLamPhieu = ngayLamPhieu;
        this.ngayXuat = ngayXuat;        
        this.trangThaiDuyet = trangThaiDuyet;
        this.tenKh = tenKh;
        this.sdt = sdt;       
    }
}
  
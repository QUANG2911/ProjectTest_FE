export class DsPhieuNhap {
    maPhieuNhap!: string;
    ngayDk!: string;
    tenKh!: string;
    sdt!: string;
    ngayGiaoContainer!: Date;
    trangThaiDuyet!: number;
    id!: number;

    constructor( maPhieuNhap: string,  ngayDk: string,  tenKh: string, sdt: string,    ngayGiaoContainer: Date,  trangThaiDuyet: number, id: number)
    {
        this.maPhieuNhap = maPhieuNhap;
        this.ngayDk = ngayDk;
        this.tenKh = tenKh;
        this.sdt = sdt;
        this.ngayGiaoContainer = ngayGiaoContainer;
        this.trangThaiDuyet = trangThaiDuyet;
        this.id = id;
    }
}
  
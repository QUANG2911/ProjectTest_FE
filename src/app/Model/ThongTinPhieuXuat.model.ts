export class ThongTinPhieuXuat {
    NGAYXUAT!: Date;
    bienSoDonViVanChuyen!: string;
    DONVIVANCHUYEN!: string;
  
    constructor( NGAYXUAT: Date, bienSoDonViVanChuyen: string, DONVIVANCHUYEN: string)
    {
      this.NGAYXUAT = NGAYXUAT;
      this.bienSoDonViVanChuyen = bienSoDonViVanChuyen;
      this.DONVIVANCHUYEN = DONVIVANCHUYEN;
    }
  }

export class ThongTinPhieuXuat {
    DateOfExitContainer!: Date;
    TransportExitLicensePlate!: string;
    TransportExitType!: string;
  
    constructor( DateOfExitContainer: Date, TransportExitLicensePlate: string, TransportExitType: string)
    {
      this.DateOfExitContainer = DateOfExitContainer;
      this.TransportExitLicensePlate = TransportExitLicensePlate;
      this.TransportExitType = TransportExitType;
    }
  }

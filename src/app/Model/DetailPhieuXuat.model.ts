export class DetailPhieuXuat {
    idExitForm!: string;
    idContainer!: string;
    // isoCode!: string;
    typeContainerName!: string;
    dateOfExitContainer!: Date;
    size!: number;      
    phoneNumber!: string;
    transportExitLicensePlate!: string;
    tranportExitType!: string;
    dateOfEntryContainer!: Date;
  
    constructor( idExitForm: string, idContainer: string,  isoCode: string, typeContainerName: string, dateOfExitContainer: Date,  size: number,  phoneNumber: string, transportExitLicensePlate: string,tranportExitType: string, dateOfEntryContainer: Date)
    {
      this.idExitForm = idExitForm;
      this.idContainer = idContainer;
      // this.isoCode = isoCode;
      this.typeContainerName = typeContainerName;
      this.dateOfExitContainer = dateOfExitContainer;
      this.size = size;
      this.phoneNumber = phoneNumber;
      this.transportExitLicensePlate = transportExitLicensePlate;
      this.tranportExitType = tranportExitType;
      this.dateOfEntryContainer = dateOfEntryContainer;
    }
  }

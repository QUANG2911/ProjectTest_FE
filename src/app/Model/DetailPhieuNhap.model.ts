export class DetailPhieuNhap {
    id!: number;
    idContainer!: string;
    numContainer!: string;
    isoCode!: string;
    typeContainer!: string;
    dateOfContainerEntry!: Date;
    size!: number;      
    tareWeight!: number;
    maxWeight!: string;
    transportEntryLicensePlate!: string;
    transportEntryType!: string;
    idEntryForm!: string;
    dateOfManufacture!: Date;
  
    constructor( id: number, idContainer: string,  numContainer: string,  isoCode: string, typeContainer: string, dateOfContainerEntry: Date,  size: number, tareWeight: number, maxWeight: string, transportEntryLicensePlate: string,transportEntryType: string,  idEntryForm: string,dateOfManufacture: Date)
    {
      this.id = id;
      this.idContainer = idContainer;
      this.numContainer = numContainer;
      this.isoCode = isoCode;
      this.typeContainer = typeContainer;
      this.dateOfContainerEntry = dateOfContainerEntry;
      this.size = size;
      this.tareWeight = tareWeight;
      this.maxWeight = maxWeight;
      this.transportEntryLicensePlate = transportEntryLicensePlate;
      this.transportEntryType =transportEntryType;
      this.idEntryForm = idEntryForm;
      this.dateOfManufacture = dateOfManufacture;
    }
  }

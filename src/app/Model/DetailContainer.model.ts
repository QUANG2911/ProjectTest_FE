export class DetailContainer {
      idContainer!: string;
      numContainer!: string;
      isoCode!: string;
      typeContainer!: string;
      dateOfEntryContainer!: Date;
      dateOfExitContainer!: Date;
      size!: number;      
      tareWeight!: number;
      maxWeight!: string;
      locationContainer!: string;
      transportEntryType!: string;
      transportExitType!: string;
      statusOfContainer!: string;
    
      constructor( idContainer: string,  numContainer: string,  isoCode: string, typeContainer: string, dateOfEntryContainer: Date,  dateOfExitContainer: Date, size: number, tareWeight: number, maxWeight: string, locationContainer: string,transportEntryType: string,  transportExitType: string, statusOfContainer: string)
      {
        this.idContainer = idContainer;
        this.numContainer = numContainer;
        this.isoCode = isoCode;
        this.typeContainer = typeContainer;
        this.dateOfEntryContainer = dateOfEntryContainer;
        this.size = size;
        this.tareWeight = tareWeight;
        this.maxWeight = maxWeight;
        this.locationContainer = locationContainer;
        this.dateOfExitContainer = dateOfExitContainer;
        this.transportEntryType =transportEntryType;
        this.transportExitType =transportExitType;
        this.statusOfContainer = statusOfContainer;
      }
    }
  
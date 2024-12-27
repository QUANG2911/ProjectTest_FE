export class ContainerList {
    id!: number;
    idContainer!: string;
    numContainer!: string;
    customerName!: string;
    phoneNumber!: string;
    dateOfEntryContainer!: Date;
    dateOfExitContainer!: Date;
  
    constructor( id: number,idContainer: string,  numContainer: string,  customerName: string, phoneNumber: string,  dateOfEntryContainer: Date,  dateOfExitContainer: Date)
    {
      this.id = id;
      this.idContainer = idContainer;
      this.numContainer = numContainer;
      this.customerName = customerName;
      this.phoneNumber = phoneNumber;
      this.dateOfEntryContainer = dateOfEntryContainer;
      this.dateOfExitContainer = dateOfExitContainer;
    }
  }

  
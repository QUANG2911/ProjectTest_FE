export class ContainerInSnpList {
    id!: number;
    idContainer!: string;
    typeContainerName!: string;
    size!: number;      
    dateOfEntryContainer!: Date;
  
    constructor( id: number, idContainer: string,  typeContainerName: string,  size: number, dateOfEntryContainer: Date)
    {
      this.id = id;
      this.idContainer = idContainer;
      this.typeContainerName = typeContainerName;
      this.size = size;
      this.dateOfEntryContainer = dateOfEntryContainer;
    }
  }

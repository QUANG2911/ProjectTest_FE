export class EntryContainerFormList {
    idEntryForm!: string;
    dateOfEntryRegistration!: string;
    customerName!: string;
    phoneNumber!: string;
    dateOfEntryContainer!: Date;
    status!: number;
    id!: number;

    constructor( idEntryForm: string,  dateOfEntryRegistration: string,  customerName: string, phoneNumber: string,    dateOfEntryContainer: Date,  status: number, id: number)
    {
        this.idEntryForm = idEntryForm;
        this.dateOfEntryRegistration = dateOfEntryRegistration;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.dateOfEntryContainer = dateOfEntryContainer;
        this.status = status;
        this.id = id;
    }
}
  
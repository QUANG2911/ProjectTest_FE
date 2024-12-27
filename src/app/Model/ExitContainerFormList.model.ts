export class ExitContainerFormList {
    idExitForm!: string;
    dateOfExitRegistration!: string;
    dateOfExitContainer!: Date;
    status!: number;
    customerName!: string;
    phoneNumber!: string;


    constructor( idExitForm: string,  dateOfExitRegistration: string,  status: number, customerName: string, phoneNumber: string,  dateOfExitContainer: Date)
    {
        this.idExitForm = idExitForm;
        this.dateOfExitRegistration = dateOfExitRegistration;
        this.dateOfExitContainer = dateOfExitContainer;        
        this.status = status;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;       
    }
}
  
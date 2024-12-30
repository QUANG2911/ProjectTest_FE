export class Login{
    stt!: number;
    idCustomer!: string;
    idStaff!: string;
    accountType!: string;
    pass!: string;
    username!: string;

    constructor(stt: number, idCustomer: string, idStaff: string,accountType: string,pass:string,username:string)
    {
        this.stt = stt;
        this.idCustomer = idCustomer;
        this.idStaff = idStaff;
        this.accountType = accountType;
        this.pass = pass;
        this.username = username;
    }
}
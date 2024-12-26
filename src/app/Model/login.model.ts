export class Login{
    stt!: number;
    maKH!: string;
    maNv!: string;
    loaiAccount!: string;
    pass!: string;
    username!: string;

    constructor(stt: number, maKH: string, maNv: string,loaiAccount: string,pass:string,username:string)
    {
        this.stt = stt;
        this.maKH = maKH;
        this.maNv = maNv;
        this.loaiAccount = loaiAccount;
        this.pass = pass;
        this.username = username;
    }
}
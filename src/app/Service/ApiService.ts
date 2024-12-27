import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5263/api/'; // URL API Backend

  private dataSubject = new BehaviorSubject<any[]>([]); // Subject để giữ dữ liệu
  public data$ = this.dataSubject.asObservable(); // Observable cho component subscribe

  constructor(private http: HttpClient) {}

  ////////////////////////////API CONTROLLER CONTAINER//////////////////////////////
  getContainers(): Observable<any> {
    return this.http.get(this.baseUrl +'ContainerManagement/GetContainerList');
  }

  getDetailsContainer(id :number, dateOfEntryContainer :Date): Observable<any>
  {
    return this.http.get(this.baseUrl + 'ContainerManagement/GetInformationContainer/'+ id+'/'+dateOfEntryContainer);
  }

  getContainerType()
  {
    return this.http.get(this.baseUrl +'ContainerManagement/GetContainerType');
  }
   ////////////////////////////API CONTROLLER PHIEU NHAP//////////////////////////////
  getDsPhieuNhap(userId :string): Observable<any>
  {
    return this.http.get(this.baseUrl+'EntryContainerFormManagement/GetContainerEntryFormList/'+ userId);
  }

  getDetailsPhieuNhap( maPhieuNhap :string): Observable<any>
  {
    return this.http.get(this.baseUrl + 'EntryContainerFormManagement/GetInformationContainerEntryForm/'+maPhieuNhap);
  }

  putDetailsPhieuNhap( maPhieuNhap :string, trangThai: number): Observable<any>
  {
    return this.http.put(this.baseUrl + 'EntryContainerFormManagement/UpdateStatusContainerEntryForm/'+maPhieuNhap + '/' +trangThai ,{});
  }

  postNewPhieuNhap(userId: string, data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'EntryContainerFormManagement/CreateContainerEntryForm/' + userId ,data);
  }


   ////////////////////////////API CONTROLLER PHIEU XUAT//////////////////////////////
  GetDsPhieuXuat(userId: string): Observable<any>{    
    return this.http.get(this.baseUrl + "ExitContainerFormManagement/GetContainerExitFormList/" + userId);
  }

  GetDetailPhieuXuat(maPhieu: string): Observable<any>{
    return this.http.get(this.baseUrl+ "ExitContainerFormManagement/GetInformationContainerExitForm/" + maPhieu);
  }

  putDetailsPhieuXuat( maPhieuXuat :string, trangThai: number): Observable<any>
  {
    return this.http.put(this.baseUrl + 'ExitContainerFormManagement/UpdateStatusContainerExitForm/'+maPhieuXuat + '/' +trangThai ,{});
  }

  GetDsContainerCuaKhChuaXuat(userId: string)
  {
    return this.http.get(this.baseUrl + "ExitContainerFormManagement/GetListContainerOfUserInSnp/"+userId);
  }

  postNewPhieuXuat(userId: string,idContainer: string, data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'ExitContainerFormManagement/CreateContainerExitForm/' + userId +'/'+idContainer,data);
  }

  ////////////////////////////////LOGIN////////////////////////////////
  GetUserLogin(userName: string, password: string)
  {
    return this.http.get(this.baseUrl + "Login/GetUserId/"+userName + "/"+password);
  }
}

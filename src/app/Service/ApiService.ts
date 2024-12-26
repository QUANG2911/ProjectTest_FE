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
    return this.http.get(this.baseUrl +'DanhSachContainer/GetDanhSachContainer');
  }

  getDetailsContainer(id :number, ngayditoivitri :Date): Observable<any>
  {
    return this.http.get(this.baseUrl + 'DanhSachContainer/GetChiTietContainer/'+ id+'/'+ngayditoivitri);
  }

  getLoaiContainer()
  {
    return this.http.get(this.baseUrl +'DanhSachContainer/getLoaiContainer');
  }
   ////////////////////////////API CONTROLLER PHIEU NHAP//////////////////////////////
  getDsPhieuNhap(userId :string): Observable<any>
  {
    return this.http.get(this.baseUrl+'DanhSachPhieuDangKy/DanhSachPhieuNhap/'+ userId);
  }

  getDetailsPhieuNhap( maPhieuNhap :string): Observable<any>
  {
    return this.http.get(this.baseUrl + 'DanhSachPhieuDangKy/ThongTinPhieuNhap/'+maPhieuNhap);
  }

  putDetailsPhieuNhap( maPhieuNhap :string, trangThai: number): Observable<any>
  {
    return this.http.put(this.baseUrl + 'DanhSachPhieuDangKy/CapNhatTrangThaiPhieuNhap/'+maPhieuNhap + '/' +trangThai ,{});
  }

  postNewPhieuNhap(userId: string, data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'DanhSachPhieuDangKy/CreatePhieuDangKyNhap/' + userId ,data);
  }


   ////////////////////////////API CONTROLLER PHIEU XUAT//////////////////////////////
  GetDsPhieuXuat(userId: string): Observable<any>{    
    return this.http.get(this.baseUrl + "DanhSachPhieuXuat/DanhSachPhieuXuat/" + userId);
  }

  GetDetailPhieuXuat(maPhieu: string): Observable<any>{
    return this.http.get(this.baseUrl+ "DanhSachPhieuXuat/DanhSachContainerXuat/" + maPhieu);
  }

  putDetailsPhieuXuat( maPhieuXuat :string, trangThai: number): Observable<any>
  {
    return this.http.put(this.baseUrl + 'DanhSachPhieuXuat/DuyetPhieuXuat/'+maPhieuXuat + '/' +trangThai ,{});
  }

  GetDsContainerCuaKhChuaXuat(userId: string)
  {
    return this.http.get(this.baseUrl + "DanhSachPhieuXuat/DsContainerCuaUserTrongCang"+userId);
  }

  postNewPhieuXuat(userId: string,idContainer: string, data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'DanhSachPhieuXuat/PhieuXuat/' + userId +'/'+idContainer,data);
  }

  ////////////////////////////////LOGIN////////////////////////////////
  GetThongTinLogin(userName: string, password: string)
  {
    return this.http.get(this.baseUrl + "Login/GetThongTinDangNhap/"+userName + "/"+password);
  }
}

import { Routes } from '@angular/router';
import { ContainerComponent } from './componentThuVien/container/container.component';
import { DetailContainerComponent } from './componentThuVien/detail-container/detail-container.component';
import { SidenavComponent } from './componentThuVien/ThuVien/SideNav/SideNav.component';
import { PhieuNhapContainerComponent } from './componentThuVien/phieu-nhap-container/phieu-nhap-container.component';
import { DetailPhieuNhapComponent } from './componentThuVien/detail-phieu-nhap/detail-phieu-nhap.component';
import { AddPhieuNhapComponent } from './componentThuVien/add-phieu-nhap/add-phieu-nhap.component';
import { PhieuXuatContainerComponent } from './componentThuVien/phieu-xuat-container/phieu-xuat-container.component';
import { DetailPhieuXuatComponent } from './componentThuVien/detail-phieu-xuat/detail-phieu-xuat.component';
import { AddPhieuXuatComponent } from './componentThuVien/add-phieu-xuat/add-phieu-xuat.component';
import { LoginInComponent } from './componentThuVien/login-in/login-in.component';
import { MainAppComponent } from './componentThuVien/main-app/main-app.component';


export const routes: Routes = [
    {path: 'login',component: LoginInComponent},
    {path: 'mainApp',component:MainAppComponent,
        children:
        [
            {path: 'navbar',component:SidenavComponent},
            // {path: 'body', component:BodyComponent, children},
            /////////Container////////
            {path: 'container',component:ContainerComponent},
            {path: 'detailContainer',component:DetailContainerComponent},
            /////////PhieuXuat////////
            {path: 'phieuXuatContainer', component:PhieuXuatContainerComponent}, 
            {path: 'detailPhieuXuat', component:DetailPhieuXuatComponent},
            {path: 'addPhieuXuat',component: AddPhieuXuatComponent},
            /////////PhieuNhap////////
            {path: 'phieuNhapcontainer', component:PhieuNhapContainerComponent}, 
            {path: 'addPhieuNhap', component:AddPhieuNhapComponent},   
            {path: 'detailPhieuNhap', component:DetailPhieuNhapComponent},  
            { path: '', redirectTo: 'phieuNhapcontainer', pathMatch: 'full' },
        ]
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect khi không tìm thấy route
];


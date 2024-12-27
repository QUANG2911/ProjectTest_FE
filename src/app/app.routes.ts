import { Routes } from '@angular/router';
import { ContainerComponent } from './componentThuVien/container/container.component';
import { DetailContainerComponent } from './componentThuVien/DetailContainer/DetailContainer.component';
import { SidenavComponent } from './componentThuVien/ThuVien/SideNav/SideNav.component';
import { PhieuNhapContainerComponent } from './componentThuVien/PhieuNhapContainer/PhieuNhapContainer.component';
import { DetailPhieuNhapComponent } from './componentThuVien/DetailPhieuNhap/DetailPhieuNhap.component';
import { AddPhieuNhapComponent } from './componentThuVien/AddPhieuNhap/AddPhieuNhap.component';
import { PhieuXuatContainerComponent } from './componentThuVien/PhieuXuatContainer/PhieuXuatContainer.component';
import { DetailPhieuXuatComponent } from './componentThuVien/DetailPhieuXuat/DetailPhieuXuat.component';
import { AddPhieuXuatComponent } from './componentThuVien/AddPhieuXuat/AddPhieuXuat.component';
import { LoginInComponent } from './componentThuVien/Login/Login.component';
import { MainAppComponent } from './componentThuVien/MainApp/MainApp.component';


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


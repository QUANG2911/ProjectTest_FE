import { Routes } from '@angular/router';
import { DetailContainerComponent } from './componentThuVien/ContainerDetail/ContainerDetail.component';
import { SidenavComponent } from './componentThuVien/ThuVien/SideNav/SideNav.component';
import { EntryContainerFormComponent} from './componentThuVien/EntryContainerForm/EntyContainerForm.component';
import { EntryContainerFormDetailComponent } from './componentThuVien/EntryContainerFormDetail/EntryContainerFormDetail.component';
import { EntryContainerFormAddComponent } from './componentThuVien/EntryContainerFormAdd/EntryContainerFormAdd.component';
import { ExitContainerFormComponent } from './componentThuVien/ExitContainerForm/ExitContainerForm.component';
import { ExitContainerFormDetailComponent } from './componentThuVien/ExitContainerFormDetail/ExitContainerFormDetail.component';
import { ExitContainerFormAddComponent } from './componentThuVien/ExitContainerFormAdd/ExitContainerFormAdd.component';
import { LoginInComponent } from './componentThuVien/Login/Login.component';
import { MainAppComponent } from './componentThuVien/MainApp/MainApp.component';
import { ContainerComponent } from './componentThuVien/Container/Container.component';


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
            {path: 'ExitContainerForm', component:ExitContainerFormComponent}, 
            {path: 'ExitContainerFormDetail', component:ExitContainerFormDetailComponent},
            {path: 'ExitContainerFormAdd',component: ExitContainerFormAddComponent},
            /////////PhieuNhap////////
            {path: 'EntryContainerForm', component:EntryContainerFormComponent}, 
            {path: 'EntryContainerFormAdd', component:EntryContainerFormAddComponent},   
            {path: 'EntryContainerFormDetail', component:EntryContainerFormDetailComponent},  
            { path: '', redirectTo: 'ExitContainerForm', pathMatch: 'full' },
        ]
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect khi không tìm thấy route
];


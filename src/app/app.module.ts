import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { appConfig ,appServiceConfig} from './AppConfig/appConfig.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { RequestInterceptor } from './request.interceptor';
// import { InitService } from './init.service';
// function initFactory(initService:InitService){
//   return initService.init();
// }



@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomListComponent,
    HeaderComponent,
    ContainerComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers:[{
    provide: appServiceConfig,
    useValue: appConfig
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi:true
  },
  // {
  //   provide:APP_INITIALIZER,
  //   useFactory: initFactory,
  //   deps: [InitService],
  //   multi: true
  // }
]
})
export class AppModule { }

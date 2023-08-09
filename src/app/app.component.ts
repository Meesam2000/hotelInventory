import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localstoragetokken } from './localstorage.token';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  //template: `<h1>My First App</h1>
  //<p>Angular is awsome</p>`,
  //styleUrls: ['./app.component.scss']
  styles: [`h1 {color: red}`]
})
export class AppComponent implements AfterViewInit,OnInit{
  title = 'hotelInvetoryApp';
  constructor(@Optional() private loggerService: LoggerService,@Inject(localstoragetokken) private localStorage:any){

  }
  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.localStorage.setItem('name', 'Hilton Hotel')
  }

  @ViewChild('name') name!:ElementRef;
  ngAfterViewInit(): void {
    this.name.nativeElement.innerText='Hilton Hotel';
  }
  // @ViewChild('user',{read: ViewContainerRef}) vcr!:ViewContainerRef;
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.noOfRooms = 50;
  // }
  //userType = 'User'
}

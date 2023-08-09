import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Rooms, RoomsList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError,map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked,OnDestroy {

  hotelName = 'PC Hotel';
  noOfRooms = 8;
  hiddenRooms = true;
  roomList: RoomsList[] = []
  selectedRoom!: RoomsList;
  title = 'Room List';
  totalBytes = 0 ;
  subscription!: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  //no subscription method
  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err)=>{
      this.error$.next(err.message);
      return ([]);
    })
  );
  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) =>rooms.length) 
  );
  stream = new Observable(observer=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.complete();
  })
  constructor(private roomService : RoomsService){

  }
  toggle() {
    this.hiddenRooms = !this.hiddenRooms;
    this.title = 'Rooms List';
  }

  ngOnInit(): void {
    //console.log (this.headerComponent)
    this.stream.subscribe({
      next: (value)=>console.log(value),
      complete: ()=>console.log('complete'),
      error:(err)=>console.log(err)
    })
    //this.roomService.getRooms$.subscribe(rooms=>{
    //   this.roomList = rooms;
    // });
    //httprequest module
    this.subscription = this.roomService.getPhotos().subscribe((event)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log('Request is made');
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log('Request is succefull');
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
          break;
        }
      }
    })
  }
  ngDoCheck(): void {
    console.log("Do check is called");
  }
  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 0,
    bookedRooms: 5
  }
  selectRoom(room: RoomsList) {
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomsList = {
      roomNumber: '4',
      roomType: 'Delux',
      amenities: 'Air Conditioner, Free Wifi, Bathroom, Kitchen, TV',
      price: 3000,
      image: 'https://media.istockphoto.com/id/1050564510/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=ZYEso7dgPl889aYddhY2Fj3GOyuwqliHkbbT8pjl_iM=',
      checkIn: new Date(1990, 4, 7),
      checkOut: new Date(1990, 4, 7),
      rating: 3.9
    }
    //this.roomList.push(room);

    //this.roomList = [...this.roomList, room];
    this.roomService.addRoom(room).subscribe((data): void=>{
      this.roomList = data;
    });
  }
  editRoom(){
    const room: RoomsList = {
      roomNumber: '3',
      roomType: 'Delux',
      amenities: 'Air Conditioner, Free Wifi, Bathroom, Kitchen, TV',
      price: 3000,
      image: 'https://media.istockphoto.com/id/1050564510/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=ZYEso7dgPl889aYddhY2Fj3GOyuwqliHkbbT8pjl_iM=',
      checkIn: new Date(1990, 4, 7),
      checkOut: new Date(1990, 4, 7),
      rating: 3.9
    }
    this.roomService.editRoom(room).subscribe((data): void=>{
      this.roomList = data;
    });
  }
  deleteRoom(){
    this.roomService.deleteRoom('3').subscribe((data)=>{
        this.roomList=data;
    });
  }
  // @ViewChild(HeaderComponent,{static:true}) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  //@ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;
  ngAfterViewInit(): void {
    this.headerComponent.title = 'ROOMS VIEW';
    //this.headerChildrenComponent.last.title = "Last Title"; //YOU CAN USE ALL THE FUNCTION THAT YOU 
  }
  ngAfterViewChecked(): void {
  }
  ngOnDestroy():void{
      this.subscription.unsubscribe;
  }
}

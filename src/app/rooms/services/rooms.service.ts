import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../rooms';
import { appServiceConfig } from 'src/app/AppConfig/appConfig.service';
import { AppConfig } from 'src/app/AppConfig/appConfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(appServiceConfig) private config:AppConfig,private http: HttpClient) { 
    console.log(this.config.apiEndpoint);
    console.log('Room service initialized');
  }
  roomList: RoomsList[] = [];
  //   {
  //     roomNumber: 1,
  //     roomType: 'Super Delux',
  //     amenities: 'Air Conditioner, Free Wifi, Bathroom, Kitchen, TV',
  //     price: 4000,
  //     image: 'https://media.istockphoto.com/id/1050564510/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=ZYEso7dgPl889aYddhY2Fj3GOyuwqliHkbbT8pjl_iM=',
  //     checkIn: new Date(1990, 4, 7),
  //     checkOut: new Date(1990, 4, 7),
  //     rating: 3.2
  //   },
  //   {
  //     roomNumber: 2,
  //     roomType: 'Economy',
  //     amenities: 'Air Conditioner, Free Wifi, Bathroom, Kitchen, TV',
  //     price: 1500,
  //     image: 'https://media.istockphoto.com/id/1050564510/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=ZYEso7dgPl889aYddhY2Fj3GOyuwqliHkbbT8pjl_iM=',
  //     checkIn: new Date(1990, 4, 7),
  //     checkOut: new Date(1990, 4, 7),
  //     rating: 2.4
  //   },
  //   {
  //     roomNumber: 3,
  //     roomType: 'Delux',
  //     amenities: 'Air Conditioner, Free Wifi, Bathroom, Kitchen, TV',
  //     price: 2500,
  //     image: 'https://media.istockphoto.com/id/1050564510/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=ZYEso7dgPl889aYddhY2Fj3GOyuwqliHkbbT8pjl_iM=',
  //     checkIn: new Date(1990, 4, 7),
  //     checkOut: new Date(1990, 4, 7),
  //     rating: 3.6
  //   }
  // ]
  //adding some data in header.
  //headers = new HttpHeaders({tokken: '1234556543gf'});
  //  getRooms$ = this.http.get<RoomsList[]>('/api/rooms',
  //  {headers : this.headers}).pipe(
  //   shareReplay(1)
  // );
  getRooms$ = this.http.get<RoomsList[]>('/api/rooms').pipe(
    shareReplay(1)
  );
  getRooms(){
    return this.http.get<RoomsList[]>('/api/rooms');
  }
  addRoom(room:RoomsList){
    return this.http.post<RoomsList[]>('/api/rooms',room);
  }
  editRoom(room:RoomsList){
    return this.http.put<RoomsList[]>(`/api/rooms/${room.roomNumber}`,room);
  }
  deleteRoom(id:string){
    return this.http.delete<RoomsList[]>(`/api/rooms/${id}`);
  }
  getPhotos(){
    const request = new HttpRequest('GET','https://jsonplaceholder.typicode.com/photos',
    {
      reportProgress:true
    });
  return this.http.request(request);
  }
}

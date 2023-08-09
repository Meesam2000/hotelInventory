export interface Rooms{
    totalRooms : number;
    bookedRooms : number;
    availableRooms : number;
}

export interface RoomsList{
    roomNumber : string;
    roomType : string ; 
    amenities: string;
    price : number;
    image : string;
    checkIn: Date;
    checkOut:Date;
    rating:number;
}
import { ChangeDetectionStrategy, Component,EventEmitter,Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { RoomsList } from '../rooms';

@Component({
  selector: 'hinv-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush 
})
export class RoomListComponent implements OnChanges,OnDestroy{

  @Input() rooms: RoomsList[] | null= [];
  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomsList>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title'])
    {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
  ngOnDestroy(): void {
    console.log('on destroy is called')
  }

  selectRoom(room:RoomsList){
    this.selectedRoom.emit(room);
  }
}

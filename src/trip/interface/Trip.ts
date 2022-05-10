import { EventType } from 'src/event/interface/Event';
import { Flight } from 'src/flight/interface/Flight';
import { Hotel } from 'src/hotel/interface/Hotel';
import { UsersOnTrips } from 'src/users-on-trips/interface/UsersOnTrips';

export interface Trip {
  id: number;
  start: Date;
  end: Date;
  destination: string;
  Hotels?: Hotel[];
  Flights?: Flight[];
  Events?: EventType[]; // ts didn't like Event as a name
  UsersOnTrips?: UsersOnTrips[];
  createdAt: Date;
}

import { User } from 'src/user/interface/User';
import { UsersOnFlights } from 'src/users-on-flights/interface/UsersOnFlights';

export interface Flight {
  id: number;
  departure: Date;
  arrival: Date;
  gate: string;
  depAirport: string;
  arrAirport: string;
  lengthOfFlight: string;
  price: string;
  flightApiId: number;
  UsersOnFlights?: UsersOnFlights[];
  Users?: User[];
  createdAt: Date;
}

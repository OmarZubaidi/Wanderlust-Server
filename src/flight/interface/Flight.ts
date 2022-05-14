import { User } from 'src/user/interface/User';
import { UsersOnFlights } from 'src/users-on-flights/interface/UsersOnFlights';

export interface Flight {
  id: number;
  lengthOfFlight: string;
  price: number;
  departureCity: string;
  arrivalCity: string;
  flightApiId: number;
  UsersOnFlights?: UsersOnFlights[];
  Users?: User[];
  createdAt: Date;
  itineraries: string;
}

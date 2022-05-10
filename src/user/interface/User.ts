import { Hotel } from '../../hotel/interface/Hotel';
import { Flight } from '../../flight/interface/Flight';
import { UsersOnTrips } from 'src/users-on-trips/interface/UsersOnTrips';

export interface User {
  id: number;
  email: string;
  username: string;
  sub: string;
  emailVerified: boolean;
  pictureUrl: string;
  origin?: string;
  createdAt: Date;
  Hotels?: Hotel[];
  Flights?: Flight[];
  UsersOnTrips?: UsersOnTrips[];
}

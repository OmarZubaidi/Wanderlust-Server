import { User } from 'src/user/interface/User';
import { UsersOnHotels } from 'src/users-on-hotels/interface/UsersOnHotels';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  coordinates: string;
  arrival: Date;
  departure: Date;
  nights: number;
  priceTotal: string;
  hotelApiId: number;
  createdAt: Date;
  UsersOnHotels?: UsersOnHotels[];
  Users?: User[];
}

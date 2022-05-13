import { User } from 'src/user/interface/User';
import { UsersOnHotels } from 'src/users-on-hotels/interface/UsersOnHotels';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  longitude: number;
  latitude: number;
  arrival: Date;
  departure: Date;
  nights: number;
  priceTotal: string;
  hotelApiId: number;
  description: string;
  rating: string;
  type: string;
  createdAt: Date;
  UsersOnHotels?: UsersOnHotels[];
  Users?: User[];
}

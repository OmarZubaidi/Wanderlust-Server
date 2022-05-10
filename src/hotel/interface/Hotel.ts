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
  userId: number;
  tripId: number;
  createdAt: Date;
}

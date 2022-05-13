export interface EventType {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description: string;
  location: string;
  longitude: number;
  latitude: number;
  price: string;
  eventApiId: number;
  bookingLink: string;
  type: string;
  pictures: string;
  rating: number;
  tripId: number;
}

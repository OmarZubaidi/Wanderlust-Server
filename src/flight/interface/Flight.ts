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
  userId: number;
  tripId: number;
  createdAt: Date;
}

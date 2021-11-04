export interface IBooking {
  bookingId?: string;
  userId: string;
  destinationId: string;
  destinationName: string;
  checkInDate: Date;
  checkOutDate: Date;
  noOfPersons: number;
  totalCharges: number;
}
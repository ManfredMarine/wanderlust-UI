import { IDestination } from './../interfaces/destination.interface';
import BookingHelper from './booking-helper';
export default class RequestBodyHelper {
  static getBookDestinationReqBody(
    destination: IDestination,
    bookingForm: any,
    userId: string,
    totalCharges: number
  ) {
    const checkInDate = new Date(bookingForm.checkInDate);
    return {
      userId,
      destinationId: destination?.destinationId,
      destinationName: destination?.name,
      checkInDate: new Date(bookingForm.checkInDate),
      checkOutDate: BookingHelper.getCheckoutDate(bookingForm.checkInDate, destination?.noOfNights)._d,
      noOfPersons: bookingForm.noOfPersons,
      totalCharges
    }

  }
}
import DateHelper from "./date-helper"
export default class BookingHelper {
  static getCheckoutDate(
    checkInDate: Date,
    tripDuration: number
  ) {
    return DateHelper.addNoOfDaystoDate(checkInDate, tripDuration);
  }
}
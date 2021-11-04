import * as moment from 'moment';
export default class DateHelper {

  static addNoOfDaystoDate(date: any, daysToAdd: number): any {
    date = moment(date);
    const newDate = moment(date).add(daysToAdd, 'days');
    console.log(newDate);
    
    return newDate;
  }

  static isPastDate(date: Date): boolean {
    const today = moment();
    const selectedDate = moment(date);
    if (selectedDate.isBefore(today)) {
      return true;
    }
    return false;
  }
}
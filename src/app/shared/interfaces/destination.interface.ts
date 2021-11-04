export interface IDestination {
  destinationId: string;
  continent: string;
  imageUrl: string;
  name: string;
  details: IDetails;
  noOfNights: number;
  flightCharges: number;
  chargesPerPerson: number;
  discount: number;
  availability: number;
}

export interface IDetails {
  about: string;
  itinerary: IItinerary;
}

export interface IItinerary {
  dayWiseDetails: IDayWiseDetails;
  packageInclusions: string[];
  tourHighlights: string[];
  tourPace: string[];
}

export interface IDayWiseDetails {
  firstDay: string;
  restDaysSightSeeing: string[];
  lastDay: string;
}
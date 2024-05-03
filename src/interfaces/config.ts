export interface IConfig {
  id: number;
  name: string;
  internalName: string;
  description: null;
  liveFlag: number;
  demoFlag: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  timezoneOffset: string;
  locale: string;
  timeZone: string;
  webSettings: {
    id: number;
    venueId: number;
    bannerImage: string;
    backgroundColour: string;
    primaryColour: string;
    primaryColourHover: string;
    navBackgroundColour: string;
  };
  ccy: string;
  ccySymbol: string;
  currency: string;
}

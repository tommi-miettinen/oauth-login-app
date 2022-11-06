type Address = {
  type: string;
  organisation: string;
  addressName: string;
  name: string;
  streetAddress: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  verified: boolean;
  source: string;
  language: string;
  from: string;
  until: string;
  tags: string[];
  id: string;
};

type Email = {
  address: string;
  verified: boolean;
};

type Mobile = {
  number: string;
  verified: boolean;
};

type UserData = {
  addresses: Address[];
  legalAddresses: Address[];
  domicileCode: string;
  legalDomicileCode: string;
  domicileClasses: string[];
  emails: Email[];
  mobiles: Mobile[];
  name: {
    givenName: string;
    middleName: string;
    familyName: string;
  };
  nickName: string;
  screenName: string;
  dateOfBirth: string;
  minor: boolean;
  timeZone: string;
  locale: string;
  consents: {
    marketingPost: boolean;
    marketingEmail: boolean;
    marketingPhone: boolean;
    marketingMobileMessage: boolean;
    locationing: boolean;
    profiling: boolean;
  };
  lastModified: string;
};

interface AppNotification {
  message: string;
  type: "success" | "error";
  notificationId?: string;
}

type AppNotifications = AppNotification[];

interface NotificationStore {
  notifications: AppNotifications;
  notify: (notification: AppNotification) => any;
}

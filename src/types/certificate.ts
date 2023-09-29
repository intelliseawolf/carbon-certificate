export interface Certificate {
  id: number;
  combinedCertificates: Certificate[];
  uniqueNumber: string;
  status: string;
  ownershipStatus: string;
  vintageYear: number[];
  methodologyVersion: number[];
  countryCode: string;
  companyName: string;
  standard: string;
  tonnes: number;
  issuanceDate: string;
  deployment: string;
  validity: string;
  replenishment: string;
  carbonCertificateNft: string;
  carbonField: CarbonField;
  carbonUser: CarbonUser;
  carbonCertificateOwnerAccount: CarbonCertificateOwnerAccount;
  isFavorite?: boolean;
}

export interface CarbonField {
  id: number;
  carbonFarm: {
    id: number;
    carbonAddress: {
      id: number;
      carbonCountry: string;
    };
  };
}

export interface CarbonUser {
  id: number;
  user: {
    id: number;
  };
  company: {
    id: number;
    name: string;
    address: {
      id: number;
      country: string;
    };
  };
}

export interface CarbonCertificateOwnerAccount {
  id: number;
  carbonUser: {
    id: number;
    user: {
      id: number;
    };
    company: {
      id: number;
      name: string;
      address: {
        id: number;
        country: string;
      };
    };
  };
}

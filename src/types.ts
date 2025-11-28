export type Currency = 'USD' | 'EUR' | 'RUB';

export type OfferStatus = 'active' | 'stopped' | 'archived';

export interface AdPlatform {
  id: string;
  name: string;    
  icon?: string;     
  balance?: number;  
  accounts?: number;
  avgCpc?: number;  
  avgCpa?: number;   
}

export interface Offer {
  id: string;
  name: string;
  platforms: string[];
  launchDate: string;
  balance: number;     
  spend: number;      
  status: OfferStatus;
  clicks: number;
  conversions: number;


  direction?: string; 
  object?: string;     
  goal?: string;      
  tracker?: string;   
  geo?: string;     
  adPlatforms?: AdPlatform[];
}

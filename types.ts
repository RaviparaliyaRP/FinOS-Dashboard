
export type AppType = 'EMI' | 'SIP' | 'GST' | 'Settings' | 'Portfolio' | 'Documents' | 'RecycleBin' | 'Projects';

export interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowInstance {
  id: string;
  type: AppType;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialX: number;
  initialY: number;
  initialWidth?: number;
  initialHeight?: number;
}

export interface MarketData {
  status: 'Open' | 'Closed';
  sensex: string;
  nifty: string;
  change: string;
}


export enum Vector {
  SPIRITUAL = 'SPIRITUAL',
  STRATEGIC = 'STRATEGIC',
  CONTROL = 'CONTROL',
  SOCIAL = 'SOCIAL'
}

export enum Chassis {
  ORACLE = 'ORACLE',
  SCALPEL = 'SCALPEL',
  SHIELD = 'SHIELD',
  FLASH = 'FLASH'
}

export interface SignalRequest {
  vector: Vector;
  chassis: Chassis;
  noise: string;
}

export interface SignalResponse {
  signal: string;
  timestamp: string;
}

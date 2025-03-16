export type Service = {
  title: string;
  description: string;
  timestamp: string; 
};

export type ModbusConfig = { 
  host: string;
  port: number;
};


export type MachineMetric = { 
  title: string;
  description: string;
  timestamp: string;
};

export type Factory = { 
  title: string;
  description: string;
  timestamp: string;
};

// Base metrics interface: numeric values expected
export interface Metrics {
  airCondition: number;  
  // add other metric properties as needed
}

export interface MetricDataPoint {
  timestamp: number;
  sicaklik: number;
  nemOrani: number;
  basinc: number;
  enerjiTuketimi: number;
  verimlilikSkoru: number;
  kaliteEndeksi: number;
}

// The factory slice state – ensure your Redux slice uses these types!
export interface FactoryState {
  metrics: FactoryMetrics[]; // must be an array
  config: ModbusConfig;
  status: string;
  notifications: Notification[];
}


// src/types.ts
export type FactoryMetrics = {
  airCondition: string; // e.g. "İyi" or "Orta"
  temperature: number;
  lights: string;       // e.g. "On" or "Off"
  machineCondition: number;
  forkliftCount: number;
  employeeCount: number;
};

export interface Metrics {
  airCondition: number; // numeric version for AI suggestions
  temperature: number;
  lights: number;
  machineCondition: number;
  forkliftCount: number;
  employeeCount: number;
}

export type Notification = {
  id: number;
  message: string;
  timestamp: string;
};


export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'baixa' | 'média' | 'alta';
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  city: string;
}

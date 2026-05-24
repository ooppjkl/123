export interface UserProfile {
  id: string;
  name: string;
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  goal: 'lose' | 'gain' | 'shape';
  allergies: string[];
  dietType: string;
  waterGoal: number;
  updatedAt: string;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  time: string;
  calories: number;
}

export interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  calories: number;
  completed: boolean;
  image?: string;
}

export interface DailyPlan {
  date: string;
  calories: {
    total: number;
    consumed: number;
    remaining: number;
  };
  macros: {
    protein: { current: number; goal: number };
    carbs: { current: number; goal: number };
    fat: { current: number; goal: number };
  };
  meals: Meal[];
  waterIntake: number;
  waterGoal: number;
  workouts: Workout[];
}

export interface TrackerRecord {
  date: string;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  waterIntake: number;
}

export interface Settings {
  mealTimes: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  notifications: {
    water: boolean;
    meal: boolean;
    workout: boolean;
    checkin: boolean;
  };
  dietMode: string;
}

export const mockUserProfile: UserProfile = {
  id: '1',
  name: '李健彤',
  height: 178,
  weight: 75.5,
  chest: 98.5,
  waist: 82.0,
  hips: 94.2,
  goal: 'lose',
  allergies: ['海鲜'],
  dietType: '低碳饮食',
  waterGoal: 2500,
  updatedAt: '2024-05-20',
};

export const mockDailyPlan: DailyPlan = {
  date: new Date().toISOString().split('T')[0],
  calories: {
    total: 2200,
    consumed: 1440,
    remaining: 760,
  },
  macros: {
    protein: { current: 85, goal: 120 },
    carbs: { current: 150, goal: 250 },
    fat: { current: 42, goal: 65 },
  },
  meals: [
    {
      id: '1',
      type: 'breakfast',
      name: '全麦吐司配水煮蛋',
      time: '07:30',
      calories: 340,
    },
    {
      id: '2',
      type: 'lunch',
      name: '香煎鸡胸肉糙米饭',
      time: '12:00',
      calories: 520,
    },
    {
      id: '3',
      type: 'dinner',
      name: '清蒸鳕鱼配西兰花',
      time: '18:30',
      calories: 410,
    },
    {
      id: '4',
      type: 'snack',
      name: '希腊酸奶配蓝莓',
      time: '15:30',
      calories: 170,
    },
  ],
  waterIntake: 1250,
  waterGoal: 2500,
  workouts: [
    {
      id: '1',
      name: '30分钟 居家HIIT燃脂',
      type: '力量训练',
      duration: 30,
      calories: 280,
      completed: false,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
  ],
};

export const mockTrackerRecords: TrackerRecord[] = [
  { date: '2024-05-01', weight: 77.9, chest: 99.2, waist: 83.5, hips: 95.1, caloriesConsumed: 1980, caloriesBurned: 420, waterIntake: 2100 },
  { date: '2024-05-03', weight: 77.5, chest: 99.0, waist: 83.2, hips: 94.9, caloriesConsumed: 2050, caloriesBurned: 380, waterIntake: 2300 },
  { date: '2024-05-05', weight: 77.0, chest: 98.8, waist: 82.8, hips: 94.7, caloriesConsumed: 1890, caloriesBurned: 450, waterIntake: 2000 },
  { date: '2024-05-07', weight: 76.8, chest: 98.7, waist: 82.5, hips: 94.5, caloriesConsumed: 2100, caloriesBurned: 500, waterIntake: 2400 },
  { date: '2024-05-09', weight: 76.2, chest: 98.6, waist: 82.2, hips: 94.4, caloriesConsumed: 1950, caloriesBurned: 420, waterIntake: 2200 },
  { date: '2024-05-11', weight: 75.8, chest: 98.5, waist: 82.0, hips: 94.3, caloriesConsumed: 2000, caloriesBurned: 390, waterIntake: 2150 },
  { date: '2024-05-13', weight: 75.5, chest: 98.5, waist: 82.0, hips: 94.2, caloriesConsumed: 1900, caloriesBurned: 480, waterIntake: 2500 },
];

export const mockSettings: Settings = {
  mealTimes: {
    breakfast: '07:30',
    lunch: '12:00',
    snack: '15:30',
    dinner: '18:30',
  },
  notifications: {
    water: true,
    meal: true,
    workout: true,
    checkin: false,
  },
  dietMode: '均衡营养',
};

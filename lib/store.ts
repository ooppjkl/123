import { create } from 'zustand';
import {
  UserProfile,
  DailyPlan,
  Settings,
  mockUserProfile,
  mockDailyPlan,
  mockSettings,
} from '@/mock/data';

interface AppState {
  userProfile: UserProfile;
  dailyPlan: DailyPlan;
  settings: Settings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateWaterIntake: (amount: number) => void;
  toggleWorkoutCompleted: (workoutId: string) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userProfile: mockUserProfile,
  dailyPlan: mockDailyPlan,
  settings: mockSettings,
  activeTab: 'plan',
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  updateUserProfile: (profile: Partial<UserProfile>) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    })),
  updateWaterIntake: (amount: number) =>
    set((state) => ({
      dailyPlan: {
        ...state.dailyPlan,
        waterIntake: Math.min(
          state.dailyPlan.waterIntake + amount,
          state.dailyPlan.waterGoal
        ),
      },
    })),
  toggleWorkoutCompleted: (workoutId: string) =>
    set((state) => ({
      dailyPlan: {
        ...state.dailyPlan,
        workouts: state.dailyPlan.workouts.map((w) =>
          w.id === workoutId ? { ...w, completed: !w.completed } : w
        ),
      },
    })),
  updateSettings: (newSettings: Partial<Settings>) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));

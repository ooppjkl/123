'use client';

import {
  Zap,
  Coffee,
  Sun,
  Moon,
  UtensilsCrossed,
  Droplets,
  PlayCircle,
  RefreshCw,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { dailyPlan, updateWaterIntake, toggleWorkoutCompleted } = useAppStore(
    (state) => state
  );

  const caloriesProgress = (dailyPlan.calories.consumed / dailyPlan.calories.total) * 100;
  const waterProgress = (dailyPlan.waterIntake / dailyPlan.waterGoal) * 100;

  const mealIcons = {
    breakfast: Coffee,
    lunch: Sun,
    dinner: Moon,
    snack: UtensilsCrossed,
  };

  const circleSize = 140;
  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (caloriesProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">今日计划</h1>
          <div className="w-10"></div>
        </div>

        {/* Calories Overview */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">摄入概览</h2>
          <div className="flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative">
              <svg width={circleSize} height={circleSize} className="transform -rotate-90">
                <circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="url(#gradient)"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {dailyPlan.calories.remaining}
                </span>
                <span className="text-xs text-gray-500">剩余千卡</span>
              </div>
            </div>

            {/* Macros */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">蛋白质</span>
                  <span className="font-medium text-gray-900">
                    {dailyPlan.macros.protein.current}/{dailyPlan.macros.protein.goal}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(dailyPlan.macros.protein.current / dailyPlan.macros.protein.goal) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">碳水</span>
                  <span className="font-medium text-gray-900">
                    {dailyPlan.macros.carbs.current}/{dailyPlan.macros.carbs.goal}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(dailyPlan.macros.carbs.current / dailyPlan.macros.carbs.goal) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">脂肪</span>
                  <span className="font-medium text-gray-900">
                    {dailyPlan.macros.fat.current}/{dailyPlan.macros.fat.goal}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(dailyPlan.macros.fat.current / dailyPlan.macros.fat.goal) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Meals */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">每日食谱</h2>
          <div className="space-y-4">
            {dailyPlan.meals.map((meal) => {
              const Icon = mealIcons[meal.type];
              return (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{meal.name}</p>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{meal.calories} kcal</span>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Water Intake */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-700">水分补给</h2>
            <button
              onClick={() => updateWaterIntake(250)}
              className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-6 h-6 text-indigo-600" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Droplets className="w-8 h-8 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">{dailyPlan.waterIntake}</span>
                <span className="text-gray-500">/ {dailyPlan.waterGoal}ml</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-8 flex-1 rounded-lg transition-all duration-300',
                      i < Math.floor(dailyPlan.waterIntake / (dailyPlan.waterGoal / 8))
                        ? 'bg-blue-500'
                        : 'bg-gray-100'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workout */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">运动任务</h2>
          {dailyPlan.workouts.map((workout) => (
            <div
              key={workout.id}
              className="relative overflow-hidden rounded-2xl"
            >
              {workout.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {workout.type}
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{workout.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Fire className="w-4 h-4 text-orange-500" />
                      预计 {workout.calories} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      {workout.duration} 分钟
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-50 transition-colors">
                      计时
                    </button>
                    <button
                      onClick={() => toggleWorkoutCompleted(workout.id)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        workout.completed
                          ? 'bg-green-600 text-white'
                          : 'bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:opacity-90'
                      )}
                    >
                      {workout.completed ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          完成
                        </span>
                      ) : (
                        '完成'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Missing component
function Fire({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.5 14.5A5 5 0 0 1 12 3c0 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1.5-3-1.5-5s3 1 3 5a4.5 4.5 0 0 1-9 0Z" />
      <path d="M12 18a3 3 0 0 1 0 6" />
    </svg>
  );
}

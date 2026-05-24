'use client';

import { useState } from 'react';
import { User, Settings, Bell, Upload, Download, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { settings, updateSettings } = useAppStore((state) => state);
  const [dietMode, setDietMode] = useState('均衡营养');

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const updateMealTime = (meal: keyof typeof settings.mealTimes, time: string) => {
    updateSettings({
      mealTimes: {
        ...settings.mealTimes,
        [meal]: time,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-10"></div>
          <h1 className="text-xl font-bold text-gray-900">偏好与设置</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">个人体征资料</p>
                <p className="text-sm text-gray-500">身高、体重及三维数据管理</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Diet Preferences */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">饮食偏好与习惯</h3>

          <button className="w-full flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-lg">🥗</span>
                </div>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">饮食模式</p>
                <p className="text-sm text-gray-500">{dietMode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">均衡</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              忌口与限制
            </p>
            <div className="flex flex-wrap gap-2">
              {['海鲜过敏', '乳糖不耐受', '辛辣', '生冷'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Meal Times */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">餐次时间规划</h3>

          <div className="space-y-4">
            {[
              { key: 'breakfast', label: '早餐', icon: '☕', time: settings.mealTimes.breakfast },
              { key: 'lunch', label: '午餐', icon: '☀️', time: settings.mealTimes.lunch },
              { key: 'snack', label: '加餐', icon: '🥜', time: settings.mealTimes.snack },
              { key: 'dinner', label: '晚餐', icon: '🌙', time: settings.mealTimes.dinner },
            ].map((meal) => (
              <div key={meal.key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{meal.icon}</span>
                  <span className="font-medium text-gray-700">{meal.label}</span>
                </div>
                <button className="flex items-center gap-2 text-indigo-600 font-medium">
                  <ClockIcon className="w-4 h-4" />
                  <span>{meal.time}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">通知提醒频率</h3>

          <div className="space-y-2">
            {[
              { key: 'water', label: '饮水提醒', sub: '每 2 小时推送一次', color: 'text-blue-600', bg: 'bg-blue-50', icon: <DropletsIcon className="w-5 h-5" /> },
              { key: 'meal', label: '用餐提醒', sub: '餐前 15 分钟推荐建议', color: 'text-pink-600', bg: 'bg-pink-50', icon: <BellIcon className="w-5 h-5" /> },
              { key: 'workout', label: '运动提醒', sub: '固定运动时段提前通知', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <ActivityIcon className="w-5 h-5" /> },
              { key: 'checkin', label: '打卡提醒', sub: '晚间 21:00 总结今日成就', color: 'text-teal-600', bg: 'bg-teal-50', icon: <CheckCircleIcon className="w-5 h-5" /> },
            ].map((item) => {
              const isOn = settings.notifications[item.key as keyof typeof settings.notifications];
              return (
                <div key={item.key} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', item.bg, item.color)}>
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key as any)}
                    className={cn(
                      'w-12 h-7 rounded-full transition-colors relative',
                      isOn ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' : 'bg-gray-200'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
                        isOn ? 'left-6' : 'left-1'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">数据管理</h3>
          <p className="text-sm text-gray-500 mb-4">
            您的健康数据存储在本地。为了防止丢失，建议定期导出备份。
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">导入数据</span>
              <span className="text-xs text-gray-400">JSON/CSV</span>
            </button>

            <button className="flex flex-col items-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">导出备份</span>
              <span className="text-xs text-gray-400">立即备份</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400 space-y-1">
            <p>健形智策 v2.4.0 Professional Edition</p>
            <p>© 2024 AI Health Strategist Lab. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DropletsIcon({ className }: { className?: string }) {
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

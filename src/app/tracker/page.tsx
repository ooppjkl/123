'use client';

import { useState } from 'react';
import { Calendar, TrendingUp, ArrowDown, Droplets, Activity, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { mockTrackerRecords } from '@/mock/data';

export default function TrackerPage() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');

  const latestWeight = mockTrackerRecords[mockTrackerRecords.length - 1].weight;
  const firstWeight = mockTrackerRecords[0].weight;
  const weightChange = (latestWeight - firstWeight).toFixed(1);
  const achievementRate = 88;

  const bodyData = [
    { subject: '胸围', A: mockTrackerRecords[mockTrackerRecords.length - 1].chest, fullMark: 110 },
    { subject: '腰围', A: mockTrackerRecords[mockTrackerRecords.length - 1].waist, fullMark: 100 },
    { subject: '臀围', A: mockTrackerRecords[mockTrackerRecords.length - 1].hips, fullMark: 110 },
    { subject: '手臂', A: 30, fullMark: 40 },
    { subject: '大腿', A: 55, fullMark: 70 },
  ];

  const calorieData = [
    { name: '周一', 摄入: 1980, 消耗: 420 },
    { name: '周二', 摄入: 2050, 消耗: 380 },
    { name: '周三', 摄入: 1890, 消耗: 450 },
    { name: '周四', 摄入: 2100, 消耗: 500 },
    { name: '周五', 摄入: 1950, 消耗: 420 },
    { name: '周六', 摄入: 2200, 消耗: 600 },
    { name: '周日', 摄入: 1900, 消耗: 480 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-10"></div>
          <h1 className="text-xl font-bold text-gray-900">数据追踪</h1>
          <button className="p-2 hover:bg-white rounded-full">
            <Calendar className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Period Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setPeriod('7d')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              period === '7d'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            7天
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              period === '30d'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            30天
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">体重变化</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">{weightChange}kg</span>
              <span className="flex items-center gap-1 text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                <ArrowDown className="w-3 h-3" />
                3.2%
              </span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)' }}>
            <p className="text-sm text-gray-600 mb-1">目标达成率</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">{achievementRate}%</span>
              <span className="flex items-center gap-1 text-blue-600 text-sm bg-blue-50 px-2 py-0.5 rounded-full mb-1">
                <TrendingUp className="w-3 h-3" />
                12%
              </span>
            </div>
          </div>
        </div>

        {/* Weight Chart */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">体重管理趋势</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrackerRecords}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => value.slice(5)}
                />
                <YAxis
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#weightGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body Analysis */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">体型三维分析</h3>
          <div className="flex items-center gap-6">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={bodyData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 110]} tick={false} axisLine={false} />
                  <Radar
                    name="体型"
                    dataKey="A"
                    stroke="#ec4899"
                    strokeWidth={2}
                    fill="#ec4899"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {['腰围', '臀围', '胸围'].map((item, idx) => {
                const latest = bodyData.find(b => b.subject === item);
                const change = idx === 0 ? -1.5 : idx === 1 ? 0 : 0.8;
                return (
                  <div key={item}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                      <span className="text-sm">
                        <span className="font-bold text-gray-900">{latest?.A}</span>
                        <span className="text-gray-400"> cm</span>
                        {change !== 0 && (
                          <span className={`ml-2 text-xs ${change < 0 ? 'text-emerald-500' : 'text-orange-500'}`}>
                            {change < 0 ? '↓' : '↑'} {Math.abs(change)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calorie Balance */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">摄入与消耗平衡 (kcal)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '12px' }} />
                <Bar dataKey="摄入" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="消耗" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <Droplets className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">饮水打卡</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">2100</span>
              <span className="text-sm text-gray-400">/ 2500ml</span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">运动时长</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">45</span>
              <span className="text-sm text-gray-400">/ 60min</span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-98 mb-6 flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          导出健康变化月报
        </button>

        <p className="text-center text-sm text-gray-400 mb-4">
          报表包含详细的体征分析、营养建议与下月优化策略。
        </p>
      </div>
    </div>
  );
}

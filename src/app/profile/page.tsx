'use client';

import { useState } from 'react';
import { ArrowLeft, Info, Camera, Edit3, User, Scale, Ruler, Target, Utensils, Droplets } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useAppStore((state) => state);
  const [isEditing, setIsEditing] = useState(false);

  const goals = [
    { id: 'lose', label: '减脂', sublabel: '降低体脂率', color: 'from-indigo-500 to-indigo-400', textColor: 'text-indigo-600', bg: 'bg-indigo-100' },
    { id: 'gain', label: '增肌', sublabel: '增加肌肉量', color: 'from-gray-600 to-gray-500', textColor: 'text-gray-700', bg: 'bg-gray-100' },
    { id: 'shape', label: '塑形', sublabel: '优化身体线条', color: 'from-gray-600 to-gray-500', textColor: 'text-gray-700', bg: 'bg-gray-100' },
  ];

  const allergies = ['海鲜过敏', '不吃香菜', '低碳饮食', '生酮', '纯素食'];

  const handleGoalSelect = (goalId: 'lose' | 'gain' | 'shape') => {
    updateUserProfile({ goal: goalId });
  };

  const handleAllergyToggle = (allergy: string) => {
    const current = userProfile.allergies;
    const updated = current.includes(allergy)
      ? current.filter(a => a !== allergy)
      : [...current, allergy];
    updateUserProfile({ allergies: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">完善资料</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Info className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
          <p className="text-sm text-gray-500">最后更新：{userProfile.updatedAt}</p>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">基础指标</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Ruler className="w-4 h-4 text-indigo-600" />
                <span>身高 (cm)</span>
              </div>
              <input
                type="number"
                value={userProfile.height}
                onChange={(e) => updateUserProfile({ height: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Scale className="w-4 h-4 text-pink-500" />
                <span>体重 (kg)</span>
              </div>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) => updateUserProfile({ weight: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">体侧三维 (Chest/Waist/Hips)</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">胸围</p>
              <input
                type="number"
                value={userProfile.chest}
                onChange={(e) => updateUserProfile({ chest: Number(e.target.value) })}
                className="w-full px-3 py-2 text-center text-xl font-bold text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              />
              <span className="text-sm text-gray-400">cm</span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">腰围</p>
              <input
                type="number"
                value={userProfile.waist}
                onChange={(e) => updateUserProfile({ waist: Number(e.target.value) })}
                className="w-full px-3 py-2 text-center text-xl font-bold text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              />
              <span className="text-sm text-gray-400">cm</span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">臀围</p>
              <input
                type="number"
                value={userProfile.hips}
                onChange={(e) => updateUserProfile({ hips: Number(e.target.value) })}
                className="w-full px-3 py-2 text-center text-xl font-bold text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              />
              <span className="text-sm text-gray-400">cm</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
              <Camera className="w-5 h-5" />
              拍照测量
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              <Edit3 className="w-5 h-5" />
              手动输入
            </button>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">核心健身目标</h3>
          <div className="grid grid-cols-3 gap-3">
            {goals.map((goal) => {
              const isActive = userProfile.goal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isActive
                      ? `border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100`
                      : `border-gray-100 hover:border-gray-200`
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full ${goal.bg} flex items-center justify-center`}>
                    <Target className={`w-6 h-6 ${goal.textColor}`} />
                  </div>
                  <p className={`font-semibold ${isActive ? 'text-indigo-600' : 'text-gray-700'}`}>
                    {goal.label}
                  </p>
                  <p className="text-xs text-gray-400">{goal.sublabel}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diet Preferences */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">饮食偏好与忌口</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {allergies.map((allergy) => {
              const isSelected = userProfile.allergies.includes(allergy);
              return (
                <button
                  key={allergy}
                  onClick={() => handleAllergyToggle(allergy)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {allergy}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-teal-500" />
              <span className="text-gray-700">每日饮水目标</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={userProfile.waterGoal}
                onChange={(e) => updateUserProfile({ waterGoal: Number(e.target.value) })}
                className="w-20 px-3 py-1 text-right text-teal-600 font-bold bg-transparent border-b border-teal-200 focus:border-teal-400 outline-none"
              />
              <span className="text-gray-400">ml</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-98 mb-6">
          <div className="flex items-center justify-center gap-2">
            <User className="w-5 h-5" />
            保存并更新计划
          </div>
        </button>
      </div>
    </div>
  );
}

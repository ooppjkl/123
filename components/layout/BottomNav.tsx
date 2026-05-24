'use client';

import { Home, TrendingUp, User, Settings } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { id: 'plan', label: '计划', icon: Home, path: '/' },
  { id: 'tracker', label: '趋势', icon: TrendingUp, path: '/tracker' },
  { id: 'profile', label: '资料', icon: User, path: '/profile' },
  { id: 'settings', label: '设置', icon: Settings, path: '/settings' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    router.push(item.path);
  };

  const getActiveItem = () => {
    const item = navItems.find((n) => n.path === pathname);
    return item ? item.id : activeTab;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = getActiveItem() === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

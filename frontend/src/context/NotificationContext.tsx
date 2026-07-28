import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'status';
  timestamp: string;
  read: boolean;
  jobTitle?: string;
  newStatus?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => [
    {
      id: 'n1',
      title: 'Application Status Updated 🚀',
      message: 'Your application for Senior Full Stack AI Engineer at TechCorp has been moved to Interview Scheduled!',
      type: 'status',
      jobTitle: 'Senior Full Stack AI Engineer',
      newStatus: 'INTERVIEW',
      timestamp: '10 minutes ago',
      read: false
    },
    {
      id: 'n2',
      title: 'Skill Verified on Blockchain 🔗',
      message: 'Your Python & Machine Learning skills have been verified on the SHA-256 ledger.',
      type: 'success',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 'n3',
      title: 'New AI Job Match 🎯',
      message: 'Found 3 new 90%+ match positions matching your updated resume profile.',
      type: 'info',
      timestamp: '3 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: 'n-' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, clearAll, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};



import type { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other';
  state?: string;
  district?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  examTitle: string;
  category: string;
  subCategory: string;
  childCategory: string;
  numberOfQuestions: number;
  image: {
    src: string;
    hint: string;
  };
  color: string;
  createdAt: Date;
};

export type Question = {
  id: string;
  examId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  difficulty: number; // 1-10
  image?: {
    src: string;
    alt: string;
    hint?: string;
  };
  translations?: {
    [language: string]: {
      questionText: string;
      options: string[];
    };
  };
};

export type Answer = {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
};

export type ExamAttempt = {
  id: string;
  userId: string;
  examId: string;
  startedAt: Date;
  completedAt: Date;
  score: number; // percentage
  answers: Answer[];
  date: string; // for charting
  duration: number; // in minutes
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type Course = {
    id: string;
    title: string;
    image: {
        src: string;
        hint: string;
    };
    type: 'Paid' | 'Free' | 'Combo';
    duration: number;
    language: string;
    price: number;
};

export type AnalyticsData = {
    topPages: { path: string, views: number, avgTime: string }[];
    engagement: {
        avgSessionDuration: string;
        sessionsByDay: { day: string, sessions: number }[];
    };
    newUsers: {
        count: number;
        changePercentage: number;
        recentAvatars: string[];
    }
};

export type Feedback = {
    id: string;
    examTitle: string;
    rating: number;
    comment: string;
    userName: string;
    userEmail: string;
    date: string;
};

export type Category = {
    id: number;
    name: string;
    rowOrder: number;
    language?: string;
    image?: string;
    slug?: string;
};

export type NewChildCategory = {
    id: number;
    name: string;
    rowOrder: number;
}

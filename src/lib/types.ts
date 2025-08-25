import type { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  category: string;
  numberOfQuestions: number;
  image: {
    src: string;
    hint: string;
  };
  color: string;
};

export type Question = {
  id: string;
  examId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  difficulty: number; // 1-10
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

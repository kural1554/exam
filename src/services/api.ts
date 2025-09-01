
/**
 * @file This file contains mock API functions to simulate fetching data.
 * In a real application, these would be replaced with actual API calls to a backend.
 */

import { mockExams, mockQuestions, mockUser, mockPerformanceData, mockCourses } from '@/lib/mock-data';
import type { Exam, Question, User, ExamAttempt, Course } from '@/lib/types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getExams = async (): Promise<Exam[]> => {
  await delay(300);
  return mockExams;
};

export const getExamById = async (id: string): Promise<Exam | undefined> => {
  await delay(200);
  return mockExams.find(exam => exam.id === id);
};

export const getQuestionsForExam = async (examId: string): Promise<Question[]> => {
  await delay(400);
  return mockQuestions.filter(q => q.examId === examId);
};

export const getUser = async (id: string): Promise<User | undefined> => {
    await delay(100);
    // In a real app, you would fetch the user by id.
    // For this mock, we'll just return the single mockUser.
    return mockUser;
}

export const getPerformanceData = async (userId: string): Promise<ExamAttempt[]> => {
    await delay(500);
    // Filter by userId if you had multiple users' data
    return mockPerformanceData;
}

export const getCourses = async (): Promise<Course[]> => {
    await delay(300);
    return mockCourses;
}

export const getAllUsers = async (): Promise<User[]> => {
    await delay(300);
    // Returning a list of mock users based on mock data
     const users: User[] = [
        { id: 'user1', name: 'John Doe', email: 'johndoe12@email.com', avatarUrl: "https://placehold.co/100x100?text=JD" },
        { id: 'user2', name: 'Abizar Alghifary', email: 'abizar33@email.com', avatarUrl: "https://placehold.co/100x100?text=AA" },
        { id: 'user3', name: 'Raffi Ahmad', email: 'raffiahmad@email.com', avatarUrl: "https://placehold.co/100x100?text=RA" },
        { id: 'user4', name: 'Putri Amaliah', email: 'putri211099@email.com', avatarUrl: "https://placehold.co/100x100?text=PA" },
        { id: 'user5', name: 'Zheperd Edward', email: 'zheperd77@email.com', avatarUrl: "https://placehold.co/100x100?text=ZE" },
        { id: 'user6', name: 'Exel Sudarso', email: 'exelbd99@email.com', avatarUrl: "https://placehold.co/100x100?text=ES" },
        { id: 'user7', name: 'Edward Newgate', email: 'sirohigeprts@email.com', avatarUrl: "https://placehold.co/100x100?text=EN" },
        { id: 'user8', name: 'Jack Sparrow', email: 'jacksparrow@email.com', avatarUrl: "https://placehold.co/100x100?text=JS" },
        { id: 'user9', name: 'Peter Parker', email: 'peterparker@email.com', avatarUrl: "https://placehold.co/100x100?text=PP" },
        { id: 'user10', name: 'Zuki Kato', email: 'zukizuki@email.com', avatarUrl: "https://placehold.co/100x100?text=ZK" },
    ];
    return users.map(u => ({...u, phone: `0812-xxxx-xxxx`, dateCreated: new Date().toISOString(), status: Math.random() > 0.5 ? 'Active' : 'Inactive', username: u.name.toLowerCase().replace(' ', '') }));
};

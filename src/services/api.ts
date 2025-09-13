

/**
 * @file This file contains mock API functions to simulate fetching data.
 * In a real application, these would be replaced with actual API calls to a backend.
 */

import { mockExams, mockQuestions, mockUser, mockPerformanceData, mockCourses, mockFeedback } from '@/lib/mock-data';
import type { Exam, Question, User, ExamAttempt, Course, Feedback } from '@/lib/types';

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

const states = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];
const districtsByState: Record<string, string[]> = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Kerala": ["Kochi", "Trivandrum", "Kozhikode"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"]
};
const genders: ('male' | 'female' | 'other')[] = ['male', 'female', 'other'];

export const getAllUsers = async (): Promise<User[]> => {
    await delay(300);
    // Returning a list of mock users based on mock data
     const users: Omit<User, 'id'>[] = [
        { name: 'John Doe', email: 'johndoe12@email.com', avatarUrl: "https://placehold.co/100x100?text=JD" },
        { name: 'Abizar Alghifary', email: 'abizar33@email.com', avatarUrl: "https://placehold.co/100x100?text=AA" },
        { name: 'Raffi Ahmad', email: 'raffiahmad@email.com', avatarUrl: "https://placehold.co/100x100?text=RA" },
        { name: 'Putri Amaliah', email: 'putri211099@email.com', avatarUrl: "https://placehold.co/100x100?text=PA" },
        { name: 'Zheperd Edward', email: 'zheperd77@email.com', avatarUrl: "https://placehold.co/100x100?text=ZE" },
        { name: 'Exel Sudarso', email: 'exelbd99@email.com', avatarUrl: "https://placehold.co/100x100?text=ES" },
        { name: 'Edward Newgate', email: 'sirohigeprts@email.com', avatarUrl: "https://placehold.co/100x100?text=EN" },
        { name: 'Jack Sparrow', email: 'jacksparrow@email.com', avatarUrl: "https://placehold.co/100x100?text=JS" },
        { name: 'Peter Parker', email: 'peterparker@email.com', avatarUrl: "https://placehold.co/100x100?text=PP" },
        { name: 'Zuki Kato', email: 'zukizuki@email.com', avatarUrl: "https://placehold.co/100x100?text=ZK" },
    ];

    return users.map((u, index) => {
      const state = states[index % states.length];
      const district = districtsByState[state][index % districtsByState[state].length];
      const gender = genders[index % genders.length];
      return {
        ...u,
        id: `user-${index+1}`,
        phone: `987654321${index}`,
        gender,
        state,
        district,
        dob: new Date(`199${index}-0${(index%9)+1}-1${index%3}`)
      } as User;
    });
};

// MOCK FEEDBACK API
export const getFeedback = async (): Promise<Feedback[]> => {
    await delay(500);
    // Return a copy and sort by most recent
    return [...mockFeedback].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const submitFeedback = async (data: Omit<Feedback, 'id' | 'date'>): Promise<Feedback> => {
    await delay(300);
    console.log('Simulating feedback submission:', data);
    const newFeedback: Feedback = {
        ...data,
        id: `feedback-${Date.now()}`,
        date: new Date().toISOString(),
    };
    // In a real app, this would be an API call. Here we just log it.
    // We add it to the mock array to have it available for the admin panel.
    mockFeedback.push(newFeedback); 
    return newFeedback;
};

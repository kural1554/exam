import type { User, Exam, Question, ExamAttempt, Answer } from "./types";

export const mockUser: User = {
  id: "user-1",
  name: "Alex Doe",
  email: "alex.doe@example.com",
  avatarUrl: "https://placehold.co/100x100",
};

export const mockExams: Exam[] = [
  {
    id: "math-101",
    title: "Algebra Fundamentals",
    description: "Master the basics of algebraic expressions and equations.",
    category: "Mathematics",
    numberOfQuestions: 20,
    image: {
      src: "https://placehold.co/600x400",
      hint: "mathematics textbook",
    },
    color: "bg-blue-500",
  },
  {
    id: "sci-101",
    title: "Introduction to Biology",
    description: "Explore the fascinating world of living organisms and their environments.",
    category: "Science",
    numberOfQuestions: 25,
    image: {
      src: "https://placehold.co/600x400",
      hint: "biology microscope",
    },
    color: "bg-green-500",
  },
  {
    id: "hist-101",
    title: "World History: Ancient Civilizations",
    description: "Journey through time to the cradles of civilization.",
    category: "History",
    numberOfQuestions: 30,
    image: {
      src: "https://placehold.co/600x400",
      hint: "ancient ruins",
    },
    color: "bg-yellow-500",
  },
  {
    id: "lit-101",
    title: "American Literature",
    description: "Analyze classic works from American authors.",
    category: "Literature",
    numberOfQuestions: 20,
    image: {
      src: "https://placehold.co/600x400",
      hint: "stack books",
    },
    color: "bg-purple-500",
  },
];

export const mockQuestions: Question[] = [
  // Math Questions (difficulties 1-10)
  { id: 'm1', examId: 'math-101', questionText: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 1 },
  { id: 'm2', examId: 'math-101', questionText: 'Solve for x: x - 5 = 10', options: ['10', '15', '5', '-5'], correctAnswer: '15', difficulty: 2 },
  { id: 'm3', examId: 'math-101', questionText: 'What is the area of a rectangle with length 5 and width 3?', options: ['8', '15', '16', '25'], correctAnswer: '15', difficulty: 3 },
  { id: 'm4', examId: 'math-101', questionText: 'Simplify the expression: 3(x + 2)', options: ['3x + 6', '3x + 2', 'x + 6', '3x + 5'], correctAnswer: '3x + 6', difficulty: 4 },
  { id: 'm5', examId: 'math-101', questionText: 'What is the value of 5! (5 factorial)?', options: ['120', '25', '15', '10'], correctAnswer: '120', difficulty: 5 },
  { id: 'm6', examId: 'math-101', questionText: 'Solve the quadratic equation: x² - 4 = 0', options: ['x=2', 'x=-2', 'x=2, x=-2', 'x=4'], correctAnswer: 'x=2, x=-2', difficulty: 6 },
  { id: 'm7', examId: 'math-101', questionText: 'What is the slope of the line y = 2x + 3?', options: ['1', '2', '3', '5'], correctAnswer: '2', difficulty: 7 },
  { id: 'm8', examId: 'math-101', questionText: 'Find the derivative of f(x) = x³.', options: ['3x', 'x²', '3x²', 'x³'], correctAnswer: '3x²', difficulty: 8 },
  { id: 'm9', examId: 'math-101', questionText: 'What is the integral of 2x dx?', options: ['x²', '2x²', 'x² + C', 'x'], correctAnswer: 'x² + C', difficulty: 9 },
  { id: 'm10', examId: 'math-101', questionText: 'What is the limit of (x²-1)/(x-1) as x approaches 1?', options: ['0', '1', '2', 'undefined'], correctAnswer: '2', difficulty: 10 },
  // Science Questions
  { id: 's1', examId: 'sci-101', questionText: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Chloroplast'], correctAnswer: 'Mitochondrion', difficulty: 3 },
  { id: 's2', examId: 'sci-101', questionText: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correctAnswer: 'H2O', difficulty: 1 },
  // History Questions
  { id: 'h1', examId: 'hist-101', questionText: 'In which ancient civilization were pyramids built?', options: ['Rome', 'Greece', 'Egypt', 'China'], correctAnswer: 'Egypt', difficulty: 2 },
  // Literature Questions
  { id: 'l1', examId: 'lit-101', questionText: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'Mark Twain', 'F. Scott Fitzgerald', 'Ernest Hemingway'], correctAnswer: 'Harper Lee', difficulty: 4 },
];

const createMockAnswers = (examId: string): Answer[] => {
  const questions = mockQuestions.filter(q => q.examId === examId);
  return questions.map(q => {
    const isCorrect = Math.random() > 0.3; // 70% chance of correct answer
    return {
      questionId: q.id,
      userAnswer: isCorrect ? q.correctAnswer : q.options.find(o => o !== q.correctAnswer) || q.options[0],
      isCorrect,
    };
  });
};

export const mockPerformanceData: ExamAttempt[] = [
  {
    id: "attempt-1",
    userId: "user-1",
    examId: "math-101",
    startedAt: new Date("2024-07-15T10:00:00Z"),
    completedAt: new Date("2024-07-15T10:25:00Z"),
    score: 85,
    answers: createMockAnswers("math-101"),
    date: '2024-05-01',
    duration: 25,
  },
  {
    id: "attempt-2",
    userId: "user-1",
    examId: "sci-101",
    startedAt: new Date("2024-07-18T14:00:00Z"),
    completedAt: new Date("2024-07-18T14:30:00Z"),
    score: 92,
    answers: createMockAnswers("sci-101"),
    date: '2024-05-15',
    duration: 30,
  },
  {
    id: "attempt-3",
    userId: "user-1",
    examId: "math-101",
    startedAt: new Date("2024-07-20T09:00:00Z"),
    completedAt: new Date("2024-07-20T09:22:00Z"),
    score: 95,
    answers: createMockAnswers("math-101"),
    date: '2024-06-01',
    duration: 22,
  },
    {
    id: "attempt-4",
    userId: "user-1",
    examId: "hist-101",
    startedAt: new Date("2024-07-21T11:00:00Z"),
    completedAt: new Date("2024-07-21T11:35:00Z"),
    score: 78,
    answers: createMockAnswers("hist-101"),
    date: '2024-06-15',
    duration: 35,
  },
  {
    id: "attempt-5",
    userId: "user-1",
    examId: "lit-101",
    startedAt: new Date("2024-07-22T16:00:00Z"),
    completedAt: new Date("2024-07-22T16:28:00Z"),
    score: 88,
    answers: createMockAnswers("lit-101"),
    date: '2024-07-01',
    duration: 28,
  },
];

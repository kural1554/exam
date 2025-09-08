

import type { User, Exam, Question, ExamAttempt, Answer, Course, AnalyticsData, Feedback, Category } from "./types";

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
      src: "https://placehold.co/600x400/3B82F6/white?text=Math",
      hint: "mathematics textbook",
    },
    color: "bg-blue-500",
    createdAt: new Date("2024-07-20T09:00:00Z"),
  },
  {
    id: "sci-101",
    title: "Introduction to Biology",
    description: "Explore the fascinating world of living organisms and their environments.",
    category: "Science",
    numberOfQuestions: 25,
    image: {
      src: "https://placehold.co/600x400/10B981/white?text=Science",
      hint: "biology microscope",
    },
    color: "bg-green-500",
    createdAt: new Date("2024-07-19T10:00:00Z"),
  },
  {
    id: "hist-101",
    title: "World History: Ancient Civilizations",
    description: "Journey through time to the cradles of civilization.",
    category: "History",
    numberOfQuestions: 30,
    image: {
      src: "https://placehold.co/600x400/F59E0B/white?text=History",
      hint: "ancient ruins",
    },
    color: "bg-yellow-500",
    createdAt: new Date("2024-07-18T11:00:00Z"),
  },
  {
    id: "lit-101",
    title: "American Literature",
    description: "Analyze classic works from American authors.",
    category: "Literature",
    numberOfQuestions: 20,
    image: {
      src: "https://placehold.co/600x400/8B5CF6/white?text=Literature",
      hint: "stack books",
    },
    color: "bg-purple-500",
    createdAt: new Date("2024-07-17T14:00:00Z"),
  },
  {
    id: 'phys-101',
    title: 'Fundamentals of Physics',
    description: 'Explore the basic principles of mechanics, energy, and waves.',
    category: 'Physics',
    numberOfQuestions: 25,
    image: { src: 'https://placehold.co/600x400/EF4444/white?text=Physics', hint: 'physics atom' },
    color: 'bg-red-500',
    createdAt: new Date('2024-07-16T10:00:00Z'),
  },
  {
    id: 'chem-101',
    title: 'Basic Chemistry Concepts',
    description: 'Understand atoms, molecules, and chemical reactions.',
    category: 'Chemistry',
    numberOfQuestions: 22,
    image: { src: 'https://placehold.co/600x400/38BDF8/white?text=Chemistry', hint: 'chemistry beakers' },
    color: 'bg-sky-500',
    createdAt: new Date('2024-07-15T11:30:00Z'),
  },
  {
    id: 'cs-101',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of programming and algorithms.',
    category: 'Computer Science',
    numberOfQuestions: 30,
    image: { src: 'https://placehold.co/600x400/6D28D9/white?text=CS', hint: 'computer code' },
    color: 'bg-violet-700',
    createdAt: new Date('2024-07-14T09:00:00Z'),
  },
  {
    id: 'econ-101',
    title: 'Principles of Microeconomics',
    description: 'Study supply, demand, and market structures.',
    category: 'Economics',
    numberOfQuestions: 28,
    image: { src: 'https://placehold.co/600x400/16A34A/white?text=Economics', hint: 'stock market chart' },
    color: 'bg-green-700',
    createdAt: new Date('2024-07-13T16:00:00Z'),
  },
    {
    id: "math-102",
    title: "Geometry Basics",
    description: "Understand shapes, angles, and spatial relationships.",
    category: "Mathematics",
    numberOfQuestions: 20,
    image: { src: "https://placehold.co/600x400/3B82F6/white?text=Geometry", hint: "geometric shapes" },
    color: "bg-blue-500",
    createdAt: new Date("2024-07-12T09:00:00Z"),
  },
  {
    id: "sci-102",
    title: "Earth Science",
    description: "Learn about geology, meteorology, and oceanography.",
    category: "Science",
    numberOfQuestions: 25,
    image: { src: "https://placehold.co/600x400/10B981/white?text=Earth", hint: "planet earth" },
    color: "bg-green-500",
    createdAt: new Date("2024-07-11T10:00:00Z"),
  },
  {
    id: "hist-102",
    title: "The Roman Empire",
    description: "Discover the rise and fall of one of history's greatest empires.",
    category: "History",
    numberOfQuestions: 30,
    image: { src: "https://placehold.co/600x400/F59E0B/white?text=Rome", hint: "roman colosseum" },
    color: "bg-yellow-500",
    createdAt: new Date("2024-07-10T11:00:00Z"),
  },
  {
    id: "lit-102",
    title: "Shakespeare's Plays",
    description: "Delve into the famous works of William Shakespeare.",
    category: "Literature",
    numberOfQuestions: 20,
    image: { src: "https://placehold.co/600x400/8B5CF6/white?text=Shakespeare", hint: "theater stage" },
    color: "bg-purple-500",
    createdAt: new Date("2024-07-09T14:00:00Z"),
  },
  {
    id: 'phys-102',
    title: 'Electromagnetism',
    description: 'Study electric and magnetic fields and their interactions.',
    category: 'Physics',
    numberOfQuestions: 25,
    image: { src: 'https://placehold.co/600x400/EF4444/white?text=EM', hint: 'electromagnetism diagram' },
    color: 'bg-red-500',
    createdAt: new Date('2024-07-08T10:00:00Z'),
  },
  {
    id: 'chem-102',
    title: 'Organic Chemistry',
    description: 'Focus on the structure, properties, and reactions of organic compounds.',
    category: 'Chemistry',
    numberOfQuestions: 22,
    image: { src: 'https://placehold.co/600x400/38BDF8/white?text=Organic', hint: 'molecule structure' },
    color: 'bg-sky-500',
    createdAt: new Date('2024-07-07T11:30:00Z'),
  },
  {
    id: 'cs-102',
    title: 'Data Structures',
    description: 'Learn about arrays, linked lists, trees, and graphs.',
    category: 'Computer Science',
    numberOfQuestions: 30,
    image: { src: 'https://placehold.co/600x400/6D28D9/white?text=Data', hint: 'data structure diagram' },
    color: 'bg-violet-700',
    createdAt: new Date('2024-07-06T09:00:00Z'),
  },
    {
    id: 'econ-102',
    title: 'Principles of Macroeconomics',
    description: 'Understand GDP, inflation, unemployment, and economic growth.',
    category: 'Economics',
    numberOfQuestions: 28,
    image: { src: 'https://placehold.co/600x400/16A34A/white?text=Macro', hint: 'global economy map' },
    color: 'bg-green-700',
    createdAt: new Date('2024-07-05T16:00:00Z'),
  },
    {
    id: "math-103",
    title: "Calculus I",
    description: "Introduction to limits, derivatives, and integrals.",
    category: "Mathematics",
    numberOfQuestions: 20,
    image: { src: "https://placehold.co/600x400/3B82F6/white?text=Calculus", hint: "calculus graph" },
    color: "bg-blue-500",
    createdAt: new Date("2024-07-04T09:00:00Z"),
  },
  {
    id: "sci-103",
    title: "Genetics and Evolution",
    description: "Explore the mechanisms of heredity and the process of evolution.",
    category: "Science",
    numberOfQuestions: 25,
    image: { src: "https://placehold.co/600x400/10B981/white?text=Genetics", hint: "dna strand" },
    color: "bg-green-500",
    createdAt: new Date("2024-07-03T10:00:00Z"),
  },
];

export const mockQuestions: Question[] = [
  // Math Questions (difficulties 1-10)
  { 
    id: 'm1', 
    examId: 'math-101', 
    questionText: 'What is 2 + 2?', 
    options: ['3', '4', '5', '6'], 
    correctAnswer: '4', 
    difficulty: 1,
    translations: {
      hindi: {
        questionText: '2 + 2 क्या है?',
        options: ['3', '4', '5', '6'],
      }
    }
  },
  { 
    id: 'm2', 
    examId: 'math-101', 
    questionText: 'Solve for x: x - 5 = 10', 
    options: ['10', '15', '5', '-5'], 
    correctAnswer: '15', 
    difficulty: 2,
    translations: {
      hindi: {
        questionText: 'x के लिए हल करें: x - 5 = 10',
        options: ['10', '15', '5', '-5'],
      }
    } 
  },
  { 
    id: 'm3', 
    examId: 'math-101', 
    questionText: 'What is the area of a rectangle with length 5 and width 3?', 
    options: ['8', '15', '16', '25'], 
    correctAnswer: '15', 
    difficulty: 3,
    translations: {
      hindi: {
        questionText: '5 लंबाई और 3 चौड़ाई वाले आयत का क्षेत्रफल क्या है?',
        options: ['8', '15', '16', '25'],
      }
    } 
  },
  { 
    id: 'm4', 
    examId: 'math-101', 
    questionText: 'Simplify the expression: 3(x + 2)', 
    options: ['3x + 6', '3x + 2', 'x + 6', '3x + 5'], 
    correctAnswer: '3x + 6', 
    difficulty: 4,
    translations: {
      hindi: {
        questionText: 'व्यंजक को सरल करें: 3(x + 2)',
        options: ['3x + 6', '3x + 2', 'x + 6', '3x + 5'],
      }
    }
  },
  { 
    id: 'm5', 
    examId: 'math-101', 
    questionText: 'What is the value of 5! (5 factorial)?', 
    options: ['120', '25', '15', '10'], 
    correctAnswer: '120', 
    difficulty: 5,
    translations: {
      hindi: {
        questionText: '5! (5 फैक्टोरियल) का मान क्या है?',
        options: ['120', '25', '15', '10'],
      }
    }
  },
  { 
    id: 'm6', 
    examId: 'math-101', 
    questionText: 'Solve the quadratic equation: x² - 4 = 0', 
    options: ['x=2', 'x=-2', 'x=2, x=-2', 'x=4'], 
    correctAnswer: 'x=2, x=-2', 
    difficulty: 6,
    translations: {
      hindi: {
        questionText: 'द्विघात समीकरण हल करें: x² - 4 = 0',
        options: ['x=2', 'x=-2', 'x=2, x=-2', 'x=4'],
      }
    }
  },
  { 
    id: 'm7', 
    examId: 'math-101', 
    questionText: 'What is the slope of the line y = 2x + 3?', 
    options: ['1', '2', '3', '5'], 
    correctAnswer: '2', 
    difficulty: 7,
    translations: {
      hindi: {
        questionText: 'रेखा y = 2x + 3 का ढलान क्या है?',
        options: ['1', '2', '3', '5'],
      }
    }
  },
  { 
    id: 'm8', 
    examId: 'math-101', 
    questionText: 'Find the derivative of f(x) = x³.', 
    options: ['3x', 'x²', '3x²', 'x³'], 
    correctAnswer: '3x²', 
    difficulty: 8,
    translations: {
      hindi: {
        questionText: 'f(x) = x³ का अवकलज ज्ञात कीजिए।',
        options: ['3x', 'x²', '3x²', 'x³'],
      }
    }
  },
  { 
    id: 'm9', 
    examId: 'math-101', 
    questionText: 'What is the integral of 2x dx?', 
    options: ['x²', '2x²', 'x² + C', 'x'], 
    correctAnswer: 'x² + C', 
    difficulty: 9,
    translations: {
      hindi: {
        questionText: '2x dx का समाकलन क्या है?',
        options: ['x²', '2x²', 'x² + C', 'x'],
      }
    }
  },
  { 
    id: 'm10', 
    examId: 'math-101', 
    questionText: 'What is the limit of (x²-1)/(x-1) as x approaches 1?', 
    options: ['0', '1', '2', 'undefined'], 
    correctAnswer: '2', 
    difficulty: 10,
    translations: {
      hindi: {
        questionText: '(x²-1)/(x-1) की सीमा क्या है जब x 1 के करीब पहुंचता है?',
        options: ['0', '1', '2', 'अपरिभाषित'],
      }
    }
  },
  // Science Questions
  { 
    id: 's1', 
    examId: 'sci-101', 
    questionText: 'What is the powerhouse of the cell?', 
    options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Chloroplast'], 
    correctAnswer: 'Mitochondrion', 
    difficulty: 3,
    translations: {
      hindi: {
        questionText: 'कोशिका का पावरहाउस क्या है?',
        options: ['नाभिक', 'राइबोसोम', 'माइटोकॉन्ड्रियन', 'क्लोरोप्लास्ट'],
      }
    }
  },
  { 
    id: 's2', 
    examId: 'sci-101', 
    questionText: 'What is the chemical symbol for water?', 
    options: ['H2O', 'CO2', 'O2', 'NaCl'], 
    correctAnswer: 'H2O', 
    difficulty: 1,
    translations: {
      hindi: {
        questionText: 'पानी का रासायनिक प्रतीक क्या है?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
      }
    }
  },
  // History Questions
  { 
    id: 'h1', 
    examId: 'hist-101', 
    questionText: 'In which ancient civilization were pyramids built?', 
    options: ['Rome', 'Greece', 'Egypt', 'China'], 
    correctAnswer: 'Egypt', 
    difficulty: 2,
    translations: {
      hindi: {
        questionText: 'किस प्राचीन सभ्यता में पिरामिड बनाए गए थे?',
        options: ['रोम', 'ग्रीस', 'मिस्र', 'चीन'],
      }
    }
  },
  // Literature Questions
  { 
    id: 'l1', 
    examId: 'lit-101', 
    questionText: 'Who wrote "To Kill a Mockingbird"?', 
    options: ['Harper Lee', 'Mark Twain', 'F. Scott Fitzgerald', 'Ernest Hemingway'], 
    correctAnswer: 'Harper Lee', 
    difficulty: 4,
    translations: {
      hindi: {
        questionText: '"To Kill a Mockingbird" किसने लिखा?',
        options: ['हार्पर ली', 'मार्क ट्वेन', 'एफ. स्कॉट फिट्जगेराल्ड', 'अर्नेस्ट हेमिंग्वे'],
      }
    }
  },
    // Physics Questions
  { 
    id: 'p1', 
    examId: 'phys-101', 
    questionText: 'What is the unit of force?', 
    options: ['Joule', 'Watt', 'Newton', 'Pascal'], 
    correctAnswer: 'Newton', 
    difficulty: 2,
    translations: {
      hindi: {
        questionText: 'बल की इकाई क्या है?',
        options: ['जूल', 'वाट', 'न्यूटन', 'पास्कल'],
      }
    }
  },
  // Chemistry Questions
  { 
    id: 'c1', 
    examId: 'chem-101', 
    questionText: 'What is the atomic number of Carbon?', 
    options: ['5', '6', '7', '8'], 
    correctAnswer: '6', 
    difficulty: 1,
    translations: {
      hindi: {
        questionText: 'कार्बन की परमाणु संख्या क्या है?',
        options: ['5', '6', '7', '8'],
      }
    }
  },
    // CS Questions
  { 
    id: 'cs1', 
    examId: 'cs-101', 
    questionText: 'What does CPU stand for?', 
    options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Unit', 'Central Processor Unit'], 
    correctAnswer: 'Central Processing Unit', 
    difficulty: 1,
    translations: {
      hindi: {
        questionText: 'सीपीयू का मतलब क्या है?',
        options: ['सेंट्रल प्रोसेसिंग यूनिट', 'कंप्यूटर पर्सनल यूनिट', 'सेंट्रल प्रोसेस यूनिट', 'सेंट्रल प्रोसेसर यूनिट'],
      }
    }
  },
  // Economics Questions
  { 
    id: 'e1', 
    examId: 'econ-101', 
    questionText: 'What is a market with only one seller called?', 
    options: ['Oligopoly', 'Monopoly', 'Duopoly', 'Perfect Competition'], 
    correctAnswer: 'Monopoly', 
    difficulty: 3,
    translations: {
      hindi: {
        questionText: 'केवल एक विक्रेता वाले बाजार को क्या कहा जाता है?',
        options: ['अल्पाधिकार', 'एकाधिकार', 'द्वयाधिकार', 'पूर्ण प्रतियोगिता'],
      }
    }
  },
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

export const mockCourses: Course[] = [
    {
        id: 'course-1',
        title: 'Arduino in Tamil',
        image: { src: 'https://placehold.co/400x225', hint: 'arduino board' },
        type: 'Paid',
        duration: 2,
        language: 'Tamil',
        price: 1499,
    },
    {
        id: 'course-2',
        title: 'Azure Solution Architect Part - 1',
        image: { src: 'https://placehold.co/400x225', hint: 'cloud architecture' },
        type: 'Paid',
        duration: 6,
        language: 'English',
        price: 1499,
    },
    {
        id: 'course-3',
        title: 'Building Estimation and Costing',
        image: { src: 'https://placehold.co/400x225', hint: 'construction blueprint calculator' },
        type: 'Paid',
        duration: 13,
        language: 'English',
        price: 2499,
    },
    {
        id: 'course-4',
        title: 'IPL - Cricket Analytics in Hindi',
        image: { src: 'https://placehold.co/400x225', hint: 'cricket stadium analytics' },
        type: 'Paid',
        duration: 1,
        language: 'Hindi',
        price: 1499,
    },
    {
        id: 'course-5',
        title: 'Introduction to FPGA Architecture',
        image: { src: 'https://placehold.co/400x225', hint: 'fpga board circuit' },
        type: 'Paid',
        duration: 7,
        language: 'English',
        price: 2499,
    },
    {
        id: 'course-6',
        title: 'Meta Ads',
        image: { src: 'https://placehold.co/400x225', hint: 'social media marketing chart' },
        type: 'Paid',
        duration: 4,
        language: 'English',
        price: 1499,
    },
    {
        id: 'course-7',
        title: 'Node.js',
        image: { src: 'https://placehold.co/400x225', hint: 'programming code abstract' },
        type: 'Paid',
        duration: 13,
        language: 'English',
        price: 2499,
    },
    {
        id: 'course-8',
        title: 'Python Zero to Hero Malayalam',
        image: { src: 'https://placehold.co/400x225', hint: 'python code editor' },
        type: 'Paid',
        duration: 17,
        language: 'Malayalam',
        price: 1499,
    },
];

export const mockAnalyticsData: AnalyticsData = {
    topPages: [
        { path: '/exams', views: 2432, avgTime: '5m 30s' },
        { path: '/dashboard', views: 1876, avgTime: '4m 15s' },
        { path: '/', views: 1543, avgTime: '2m 45s' },
        { path: '/courses', views: 987, avgTime: '3m 50s' },
        { path: '/login', views: 754, avgTime: '1m 20s' },
    ],
    engagement: {
        avgSessionDuration: "8m 12s",
        sessionsByDay: [
            { day: 'Mon', sessions: 200 },
            { day: 'Tue', sessions: 300 },
            { day: 'Wed', sessions: 250 },
            { day: 'Thu', sessions: 400 },
            { day: 'Fri', sessions: 350 },
            { day: 'Sat', sessions: 500 },
            { day: 'Sun', sessions: 450 },
        ]
    },
    newUsers: {
        count: 234,
        changePercentage: 18.2,
        recentAvatars: [
            'https://placehold.co/40x40?text=U1',
            'https://placehold.co/40x40?text=U2',
            'https://placehold.co/40x40?text=U3',
            'https://placehold.co/40x40?text=U4',
        ]
    }
};

// In-memory array to store feedback. In a real app, this would be a database.
export const mockFeedback: Feedback[] = [];

export const mockCategories: Category[] = [
    {
        id: 17,
        name: 'Textiles',
        rowOrder: 0,
    },
    {
        id: 15,
        name: 'General',
        rowOrder: 1,
    },
    {
        id: 16,
        name: 'sustainable living',
        rowOrder: 2,
    },
    {
        id: 18,
        name: 'Travel',
        rowOrder: 3,
    },
    {
        id: 19,
        name: 'Health',
        rowOrder: 4,
    },
    {
        id: 20,
        name: 'Technology',
        rowOrder: 5,
    }
];

export const mockSubCategories: Category[] = [
    { id: 1, name: 'Cotton', rowOrder: 0 },
    { id: 2, name: 'News', rowOrder: 1 },
    { id: 3, name: 'Eco-Friendly Products', rowOrder: 2 },
    { id: 4, name: 'Destinations', rowOrder: 3 },
    { id: 5, name: 'Fitness', rowOrder: 4 },
    { id: 6, name: 'AI', rowOrder: 5 },
];

export const mockChildCategories: Category[] = [
    { id: 1, name: 'Organic Cotton', rowOrder: 0 },
    { id: 2, name: 'World News', rowOrder: 1 },
    { id: 3, name: 'Recycled Materials', rowOrder: 2 },
    { id: 4, name: 'Europe', rowOrder: 3 },
    { id: 5, name: 'Yoga', rowOrder: 4 },
    { id: 6, name: 'Machine Learning', rowOrder: 5 },
];

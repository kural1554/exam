/**
 * @file This is the COMPLETE API service file.
 * It contains functions for every single endpoint provided in the API documentation.
 */

import type { Exam, Question, User, ExamAttempt, Course, Feedback } from '@/lib/types';

// Unga DRF API oda base URL
const API_BASE_URL = 'http://127.0.0.1:8000';


const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    // localStorage browser la mattum thaan irukum, so oru chinna check
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken'); // 'accessToken' unga token key ah maathikonga
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    
    return headers;
};


// --- 1. Authentication & User Management ---

export const registerUser = async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response;
};

export const verifyEmail = async (uid64: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/verify-email/${uid64}/${token}/`);
    if (!response.ok){ const errorData = await response.json();
        throw new Error(errorData.error ||'Email verification failed');}
    return response.json();
};

export const loginUser = async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
};

export const requestPasswordReset = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/password-reset-request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    return response;
};

export const confirmPasswordReset = async (resetData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users/password-reset-confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData),
    });
    return response;
};


// --- 2. Admin: Category Management ---

export const getCategories = async () => {
    console.log("Calling getCategories with headers"); // Add for debugging
    return fetch(`${API_BASE_URL}/api/exams/categories/`, { headers: getAuthHeaders() }).then(res => res.json());
};

export const getCategoryById = async (id: string) => fetch(`${API_BASE_URL}/api/exams/categories/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());

export const createCategory = async (data: any) => fetch(`${API_BASE_URL}/api/exams/categories/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }).then(res => res.json());

export const updateCategory = async (id: number, data: { name: string; exam_title: number }): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/categories/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
};

export const deleteCategory = async (id: number): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/categories/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};
// --- 3. Admin: Child Category Management ---

export const getChildCategories = async () => fetch(`${API_BASE_URL}/api/exams/childcategories/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getChildCategoryById = async (id: string) => fetch(`${API_BASE_URL}/api/exams/childcategories/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const createChildCategory = async (data: any) => fetch(`${API_BASE_URL}/api/exams/childcategories/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }).then(res => res.json());
export const updateChildCategory = async (id: number, data: { name: string; sub_category: number }): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/childcategories/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
};

export const deleteChildCategory = async (id: number): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/childcategories/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};

// --- 4. Admin: Subcategory Management ---

export const getSubcategories = async () => fetch(`${API_BASE_URL}/api/exams/subcategories/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getSubcategoryById = async (id: string) => fetch(`${API_BASE_URL}/api/exams/subcategories/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const createSubcategory = async (data: any) => fetch(`${API_BASE_URL}/api/exams/subcategories/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }).then(res => res.json());
export const updateSubcategory = async (id: number, data: { name: string; category: number }): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/subcategories/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
};

export const deleteSubcategory = async (id: number): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/subcategories/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};

// --- 5. Admin: Title Management ---

export const getExamTitles = async () => {
    console.log("Calling getExamTitles with headers"); // Add for debugging
    return fetch(`${API_BASE_URL}/api/exams/titles/`, { headers: getAuthHeaders() }).then(res => res.json());
};
export const getExamTitleById = async (id: string) => fetch(`${API_BASE_URL}/api/exams/titles/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const createExamTitle = async (data: any) => fetch(`${API_BASE_URL}/api/exams/titles/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }).then(res => res.json());


export const updateExamTitle = async (id: number, data: { name: string; row_order: number }): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/titles/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
};
export const deleteExamTitle = async (id: number): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/exams/titles/${id}/`, { 
        method: 'DELETE', 
        headers: getAuthHeaders() 
    });
};

// --- 6. Admin: Exam Management ---
export const getExamsForAdmin = async () => {
    return fetch(`${API_BASE_URL}/api/exams/manage-exams/`, { 
        headers: getAuthHeaders() 
    }).then(res => res.json());
};
export const getExamByIdForAdmin = async (id: number | string) => {
    return fetch(`${API_BASE_URL}/api/exams/manage-exams/${id}/`, { 
        headers: getAuthHeaders() 
    }).then(res => res.json());
};
export const createExam = async (examData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/exams/manage-exams/`, { 
        method: 'POST', 
        headers: getAuthHeaders(), 
        body: JSON.stringify(examData) 
    });
    if (!response.ok) {
        // This makes error handling easier on the component side
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return response.json();
};
export const updateExam = async (id: number | string, examData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/exams/manage-exams/${id}/`, { 
        method: 'PUT', 
        headers: getAuthHeaders(), 
        body: JSON.stringify(examData) 
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return response.json();
};
export const patchExam = async (id: number | string, partialData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/exams/manage-exams/${id}/`, { 
        method: 'PATCH', 
        headers: getAuthHeaders(), 
        body: JSON.stringify(partialData) 
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return response.json();
};
export const deleteExam = async (id: number | string) => {
    const response = await fetch(`${API_BASE_URL}/api/exams/manage-exams/${id}/`, { 
        method: 'DELETE', 
        headers: getAuthHeaders() 
    });
    // DELETE often returns a 204 No Content, so we don't try to .json() it
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return response; // Return the whole response object
};

// --- 7. Student: Taking Exams ---

export const getStudentExams = async () => fetch(`${API_BASE_URL}/api/exams/student/exams/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getStudentExamDetails = async (id: string) => fetch(`${API_BASE_URL}/api/exams/student/exams/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const startStudentExam = async (id: string) => fetch(`${API_BASE_URL}/api/exams/student/exams/${id}/start/`, { headers: getAuthHeaders() }).then(res => res.json());
export const submitStudentExam = async (id: string, answers: any) => fetch(`${API_BASE_URL}/api/exams/student/exams/${id}/submit/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(answers) }).then(res => res.json());


// --- 8. Results and Feedback ---

export const getStudentResults = async () => fetch(`${API_BASE_URL}/api/exams/student/results/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getStudentResultById = async (id: string) => fetch(`${API_BASE_URL}/api/exams/student/results/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getAdminFeedback = async () => fetch(`${API_BASE_URL}/api/results/admin/feedback/`, { headers: getAuthHeaders() }).then(res => res.json());
export const getAdminFeedbackById = async (id: string) => fetch(`${API_BASE_URL}/api/results/admin/feedback/${id}/`, { headers: getAuthHeaders() }).then(res => res.json());
export const submitStudentFeedback = async (data: any) => fetch(`${API_BASE_URL}/api/results/student/feedback/`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }).then(res => res.json());

export const getAllUsers = async (): Promise<User[]> => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/api/users/users/`, { 
        headers: getAuthHeaders() 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users. You may not have permission.');
    }
    
    return await response.json();

  } catch (error) {
    console.error('Error fetching all users:', error);
    return []; 
  }
};
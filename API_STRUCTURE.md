
# மாதிரி API கட்டமைப்பு (Mock API Structure)

இந்த ஆவணம், `Examplify` திட்டத்திற்கான மாதிரி API-களின் கட்டமைப்பு மற்றும் செயல்பாடுகளை விவரிக்கிறது. இது முன்பக்க மற்றும் பின்தள டெவலப்பர்களுக்கு ஒரு வழிகாட்டியாகப் பயன்படும்.

## 1. பயனர் प्रमाणीकरणம் (User Authentication)

### 1.1. பயனர் பதிவு (Sign Up)

- **Endpoint:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** ஒரு புதிய பயனரைப் பதிவு செய்கிறது.
- **Request Body:**
  ```json
  {
    "name": "string (example: 'Priya Sharma')",
    "email": "string (example: 'priya.sharma@example.com')",
    "phone": "string (example: '9876543210')",
    "dob": "date (example: '1998-07-20')",
    "gender": "enum ('male', 'female', 'other')",
    "state": "string (example: 'Tamil Nadu')",
    "district": "string (example: 'Chennai')",
    "password": "string (example: 'password123')",
    "userType": "enum ('student', 'coach')"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "User registered successfully.",
    "data": {
      "userId": "string (example: 'user-123')",
      "name": "string (example: 'Priya Sharma')",
      "email": "string (example: 'priya.sharma@example.com')",
      "token": "string (example: 'jwt-auth-token')"
    }
  }
  ```
- **Response Body (Error):**
  ```json
  {
    "success": false,
    "message": "Email already exists."
  }
  ```

### 1.2. பயனர் உள்நுழைவு (Log In)

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** பயனரை உள்நுழைய வைக்கிறது.
- **Request Body:**
  ```json
  {
    "email": "string (example: 'admin@gmail.com')",
    "password": "string (example: 'admin@123')"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "data": {
      "userId": "string (example: 'user-admin')",
      "name": "string (example: 'Admin User')",
      "email": "string (example: 'admin@gmail.com')",
      "token": "string (example: 'jwt-auth-token')",
      "isAdmin": true
    }
  }
  ```

### 1.3. கடவுச்சொல்லை மீட்டமைக்கக் கோருதல் (Request Password Reset)

- **Endpoint:** `/api/auth/forgot-password`
- **Method:** `POST`
- **Description:** கடவுச்சொல்லை மீட்டமைப்பதற்கான இணைப்பை மின்னஞ்சலுக்கு அனுப்புகிறது.
- **Request Body:**
  ```json
  {
    "email": "string (example: 'priya.sharma@example.com')"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "If an account with that email exists, a reset link has been sent."
  }
  ```

---

## 2. நிர்வாகப் பக்கம் (Admin Panel)

### 2.1. புதிய தேர்வு உருவாக்குதல் (Create Exam)

- **Endpoint:** `/api/admin/exams`
- **Method:** `POST`
- **Description:** ஒரு புதிய தேர்வை உருவாக்குகிறது.
- **Request Body:**
  ```json
  {
    "examTitleName": "string (example: 'General')",
    "category": "string (example: 'News')",
    "subCategory": "string (example: 'World News')",
    "childCategory": "string (example: 'Current Events')",
    "description": "string (example: 'A comprehensive exam on algebra.')",
    "difficulty": "enum ('Basic', 'Medium', 'Hard')",
    "hasTimeLimit": "boolean (example: true)",
    "timeLimit": "number (in minutes, example: 60)",
    "isPaid": "boolean (example: false)",
    "price": "number (example: 0)",
    "topics": "array[string] (example: ['algebra', 'equations'])",
    "examImage": "file",
    "seo": {
      "metaTitle": "string",
      "metaKeywords": "string",
      "metaDescription": "string"
    },
    "questions": [
      {
        "questionText": "string (example: 'What is 2+2?')",
        "options": ["string", "string", "string", "string"],
        "correctAnswer": "string (example: '4')",
        "marks": "number (example: 1)",
        "hasImage": "boolean (example: false)",
        "image": "file (optional)",
        "seo": {
          "metaTitle": "string",
          "metaKeywords": "string",
          "metaDescription": "string"
        }
      }
    ]
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "Exam created successfully.",
    "data": {
      "examId": "string (example: 'exam-xyz-123')"
    }
  }
  ```

### 2.2. தேர்வுப் பட்டியலைப் பெறுதல் (Get Exam List)

- **Endpoint:** `/api/admin/exams`
- **Method:** `GET`
- **Description:** அனைத்துத் தேர்வுகளின் பட்டியலைப் பெறுகிறது.
- **Response Body:** `Exam[]` (from `src/lib/types.ts`)

### 2.3. வகைகளை நிர்வகித்தல் (Manage Categories)

- **Endpoint:** `/api/admin/categories` (Applies to exam-title, category, sub-category, child-category)
- **Method:** `POST`, `PUT`, `DELETE`
- **Description:** புதிய வகைகளை உருவாக்க, புதுப்பிக்க அல்லது நீக்க.
- **Request Body (POST):**
  ```json
  {
    "name": "string (example: 'Textiles')",
    "parent_id": "number (optional, example: 17)" 
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "Category created/updated/deleted successfully."
  }
  ```

---

## 3. பொது API-கள் (Public APIs)

### 3.1. அனைத்துத் தேர்வுகளையும் பெறுதல் (Get All Exams)

- **Endpoint:** `/api/exams`
- **Method:** `GET`
- **Description:** பொதுப் பார்வைக்குக் கிடைக்கும் அனைத்துத் தேர்வுகளின் பட்டியலையும் வழங்குகிறது.
- **Response Body:** `Exam[]`

### 3.2. பயனர் கருத்தைச் சமர்ப்பித்தல் (Submit Feedback)

- **Endpoint:** `/api/feedback`
- **Method:** `POST`
- **Description:** ஒரு தேர்வு முடிந்ததும் பயனர் கருத்தைச் சமர்ப்பிக்கிறது.
- **Request Body:**
  ```json
  {
    "examTitle": "string (example: 'Algebra Fundamentals')",
    "rating": "number (1-5)",
    "comment": "string (example: 'The questions were challenging.')",
    "userName": "string (example: 'Alex Doe')",
    "userEmail": "string (example: 'alex.doe@example.com')"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully.",
    "data": {
      "id": "string (example: 'feedback-123')"
    }
  }
  ```

### 3.3. தொடர்பு படிவம் (Contact Form)

- **Endpoint:** `/api/contact`
- **Method:** `POST`
- **Description:** தொடர்புப் படிவத்திலிருந்து செய்திகளைச் சமர்ப்பிக்கிறது.
- **Request Body:**
  ```json
  {
    "name": "string (example: 'Arun Kumar')",
    "email": "string (example: 'arun.k@example.com')",
    "message": "string (example: 'I have a query about the courses.')"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully."
  }
  ```

---

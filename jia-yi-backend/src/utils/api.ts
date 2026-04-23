// API工具函数

// 根据环境确定 API 基础 URL
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? '/api' 
  : 'http://121.41.48.184/api';

// 通用请求函数
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API request failed: ${response.status}`);
  }

  return response.json();
}

// 学员相关API
export const studentApi = {
  // 获取所有学员
  getStudents: () => fetchApi<any[]>('/students'),
  
  // 添加学员
  addStudent: (student: any) => fetchApi<any>('/students', {
    method: 'POST',
    body: JSON.stringify(student),
  }),
};

// 班级相关API
export const classApi = {
  getClasses: () => fetchApi<any[]>('/classes'),
  addClass: (classData: any) => fetchApi<any>('/classes', {
    method: 'POST',
    body: JSON.stringify(classData),
  }),
};

// 教练相关API
export const coachApi = {
  getCoaches: () => fetchApi<any[]>('/coaches'),
  addCoach: (coach: any) => fetchApi<any>('/coaches', {
    method: 'POST',
    body: JSON.stringify(coach),
  }),
};

// 考试相关API
export const examApi = {
  getExams: () => fetchApi<any[]>('/exams'),
  addExam: (exam: any) => fetchApi<any>('/exams', {
    method: 'POST',
    body: JSON.stringify(exam),
  }),
};

// 考试地点相关API
export const examLocationApi = {
  getExamLocations: () => fetchApi<any[]>('/exam-locations'),
  addExamLocation: (location: any) => fetchApi<any>('/exam-locations', {
    method: 'POST',
    body: JSON.stringify(location),
  }),
};

// 考试记录相关API
export const examRecordApi = {
  getExamRecords: () => fetchApi<any[]>('/exam-records'),
  addExamRecord: (record: any) => fetchApi<any>('/exam-records', {
    method: 'POST',
    body: JSON.stringify(record),
  }),
};

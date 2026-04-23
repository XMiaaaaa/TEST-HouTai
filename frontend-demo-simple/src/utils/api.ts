// 模拟API工具函数

// 模拟数据
const mockData = {
  students: [
    { id: 1, name: '张三', age: 20, gender: '男', phone: '13800138001', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 21, gender: '女', phone: '13900139001', email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 19, gender: '男', phone: '13700137001', email: 'wangwu@example.com' },
  ],
  classes: [
    { id: 1, name: '初级班', capacity: 20, currentCount: 15 },
    { id: 2, name: '中级班', capacity: 15, currentCount: 12 },
    { id: 3, name: '高级班', capacity: 10, currentCount: 8 },
  ],
  coaches: [
    { id: 1, name: '赵教练', phone: '13500135001', email: 'zhaojiao@example.com' },
    { id: 2, name: '钱教练', phone: '13600136001', email: 'qianjiao@example.com' },
  ],
  exams: [
    { id: 1, name: '科目一', date: '2024-05-01', locationId: 1 },
    { id: 2, name: '科目二', date: '2024-05-10', locationId: 2 },
  ],
  examLocations: [
    { id: 1, name: '考场A', address: '北京市朝阳区' },
    { id: 2, name: '考场B', address: '北京市海淀区' },
  ],
  examRecords: [
    { id: 1, studentId: 1, examId: 1, score: 90, status: '通过' },
    { id: 2, studentId: 2, examId: 1, score: 85, status: '通过' },
  ],
};

// 模拟请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 学员相关API
export const studentApi = {
  // 获取所有学员
  getStudents: async () => {
    await delay(300);
    return mockData.students;
  },
  
  // 添加学员
  addStudent: async (student: any) => {
    await delay(300);
    const newStudent = {
      id: mockData.students.length + 1,
      ...student,
    };
    mockData.students.push(newStudent);
    return newStudent;
  },
};

// 班级相关API
export const classApi = {
  getClasses: async () => {
    await delay(300);
    return mockData.classes;
  },
  addClass: async (classData: any) => {
    await delay(300);
    const newClass = {
      id: mockData.classes.length + 1,
      ...classData,
    };
    mockData.classes.push(newClass);
    return newClass;
  },
};

// 教练相关API
export const coachApi = {
  getCoaches: async () => {
    await delay(300);
    return mockData.coaches;
  },
  addCoach: async (coach: any) => {
    await delay(300);
    const newCoach = {
      id: mockData.coaches.length + 1,
      ...coach,
    };
    mockData.coaches.push(newCoach);
    return newCoach;
  },
};

// 考试相关API
export const examApi = {
  getExams: async () => {
    await delay(300);
    return mockData.exams;
  },
  addExam: async (exam: any) => {
    await delay(300);
    const newExam = {
      id: mockData.exams.length + 1,
      ...exam,
    };
    mockData.exams.push(newExam);
    return newExam;
  },
};

// 考试地点相关API
export const examLocationApi = {
  getExamLocations: async () => {
    await delay(300);
    return mockData.examLocations;
  },
  addExamLocation: async (location: any) => {
    await delay(300);
    const newLocation = {
      id: mockData.examLocations.length + 1,
      ...location,
    };
    mockData.examLocations.push(newLocation);
    return newLocation;
  },
};

// 考试记录相关API
export const examRecordApi = {
  getExamRecords: async () => {
    await delay(300);
    return mockData.examRecords;
  },
  addExamRecord: async (record: any) => {
    await delay(300);
    const newRecord = {
      id: mockData.examRecords.length + 1,
      ...record,
    };
    mockData.examRecords.push(newRecord);
    return newRecord;
  },
};

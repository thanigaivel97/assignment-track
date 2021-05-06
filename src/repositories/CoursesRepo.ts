import { Department } from '../models/Course';
import { Employee } from '../models/Lesson';

class CourseRepo {
  constructor() { }

  getAllCourses(options) {
    return Department.findAll(options);
  }

  getById(courseId) {
    return Department.findByPk(courseId, {
      include: [
        {
          model: Employee,
          as: 'Employee'
        },
      ],
    });
  }
  create(departmentName, departmentNo, location) {
    return Department
      .create({
        departmentName:departmentName,
        departmentNo:departmentNo,
        location : location
      })

  }

}

export default new CourseRepo();

import { Employee } from '../models/Lesson';

class LessonRepo {
  constructor() { }

  getAllLessons(options) {
    return Employee.findAll(options);
  }

  getLessonById(id) {
    return Employee.findByPk(id);
  }

  getLessonByCourse(id) {
    return Employee.findAll({ where: { courseId: id } });
  }

  createLesson(props: any) {
    return Employee.create(props);
  }

  updateLesson(id: Number, props: any) {
    return Employee.update(props, { where: { id: id.toString() } });
  }

  deleteLesson(id: Number) {
    return Employee.destroy({ where: { id: id.toString() } });
  }
}

export default new LessonRepo();

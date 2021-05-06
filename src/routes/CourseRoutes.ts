import { Router } from 'express';
import CoursesCtrl from '../controllers/CoursesCtrl';

class CourseRoutes {
  router = Router();
  coursesCtrl = new CoursesCtrl();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.coursesCtrl.getAllCourses);
    this.router.route('/:id').get(this.coursesCtrl.getCourseDetails);
    this.router.route('/insert').post(this.coursesCtrl.createDepartment);
    this.router.route('/receive-msg').post(this.coursesCtrl.receiveDepartmentNotification);
  }
}
export default new CourseRoutes().router;

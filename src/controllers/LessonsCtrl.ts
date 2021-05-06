import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import LessonRepo from '../repositories/LessonsRepo';
const amqp = require('amqplib/callback_api');

export default class LessonsCtrl {
  constructor() { }

  async getAllLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await LessonRepo.getAllLessons({ order: ['id'] });
      res.json(lessons);
    } catch (error) {
      apiErrorHandler(error, req, res, 'Fetch All Employee failed.');
    }
  }

  async getLessonByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await LessonRepo.getLessonByCourse(req.params.id);
      res.json(lesson);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `Employee in Department ${req.params.id} failed.`,
      );
    }
  }

  async getLessonById(req: Request, res: any, next: NextFunction) {
    try {
      const result = await LessonRepo.getLessonById(req.params.id);
      if (result) {
        return res.json(result);
      } else {
        res.status(404).send(`Lesson ${req.params.id} not found.`);
      }
    } catch (error) {
      apiErrorHandler(error, req, res, `Employee ${req.params.id} failed.`);
    }
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LessonRepo.createLesson(req['value']['body']);
      this.sendMessagetoQueue(JSON.stringify(result) , "updation")

      res.json(result);
    } catch (error) {
      apiErrorHandler(error, req, res, 'Creation of Employee failed.');
    }
  }

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await LessonRepo.updateLesson(id, req['value']['body']);
      this.sendMessagetoQueue(JSON.stringify(result), "updation")

      res.json(result);

    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `updation of Employee ${req.params.id} is failed.`,
      );
    }
  }

  async sendMessagetoQueue(msg, queueName) {
    amqp.connect('amqp://localhost', (connError, connection) => {
      if (connError) {
        throw connError;
      }
      // Step 2: Create Channel
      connection.createChannel((channelError, channel) => {
        if (channelError) {
          throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = queueName
        channel.assertQueue(QUEUE);
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from(msg));
        console.log(`Message send ${QUEUE}`);
      })
    })
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await LessonRepo.deleteLesson(id);
      this.sendMessagetoQueue(JSON.stringify(result), "updation")
      res.json(result);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `deletion of Employee ${req.params.id}  is failed.`,
      );
    }
  }
}

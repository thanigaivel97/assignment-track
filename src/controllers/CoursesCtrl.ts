import { Request, Response, NextFunction } from 'express';
import DepartMentRepo from './../repositories/CoursesRepo';
import { apiErrorHandler } from './../handlers/errorHandler';
const amqp = require('amqplib/callback_api');

export default class CoursesCtrl {
  constructor() { }

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const departList = await DepartMentRepo.getAllCourses({ order: ['seqNo'] })
      res.json(departList);
    } catch (error) {
      apiErrorHandler(error, req, res, 'Fetch All Department failed.');
    }
  }

  async getCourseDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const depDetails = await DepartMentRepo.getById(req.params.id);
      if (depDetails) {
        return res.json(depDetails);
      } else {
        res.status(404).send(`Employee ${req.params.id} not found.`);
      }
    } catch (error) {
      apiErrorHandler(error, req, res, `Department ${req.params.id} is failed.`);
    }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const depDetails = await DepartMentRepo.create(req.body.departmentName, req.body.departmentNo, req.body.location);
      if (depDetails) {
        return res.json(depDetails);
      } else {
        res.status(404).send(`Error Saving`);
      }
    } catch (error) {
      apiErrorHandler(error, req, res, `Department ${req.params.id} is failed.`);

    }
  }

  async receiveDepartmentNotification(req: Request, res: Response, next: NextFunction) {
    try {

      //  Create Connection
      let msgRsponse = null
      amqp.connect('amqp://localhost', (connError, connection) => {
        if (connError) {
          throw connError;
        }
        //  Create Channel
        connection.createChannel((channelError, channel) => {
          if (channelError) {
            throw channelError;
          }
          //  Assert Queue
          const QUEUE = 'updation'
          channel.assertQueue(QUEUE);
          //  Receive Messages
          channel.consume(QUEUE, (msg) => {

            msgRsponse = msg
            const strin = `Message received: ${msg.content.toString()}`
            setTimeout(function() {
              console.log(" [x] Done");
              channel.ack(msg);
            }, 5000);

          }, {
            noAck: true
          })
        })
      })
      if (msgRsponse) {
        return res.json(msgRsponse);
      } else {
        res.status(404).send(`No msg found`);
      }
    } catch (error) {
      apiErrorHandler(error, req, res, `Department ${req.params.id} is failed.`);

    }
  }
}

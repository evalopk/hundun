import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import JxCfdService from '../../services/jxCfd';
const route = Router();

export default (app: Router) => {
  app.use('/jx-cfd', route);
  route.post(
    '/:code/:name',
    celebrate({
      params: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      try {
        const serviceInstance = Container.get(JxCfdService);
        const { code } = await serviceInstance.createCode({ name: req.params.name, code: req.params.code });
        return res.status(200).json({ code: 200, data: code });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const serviceInstance = Container.get(JxCfdService);
      const { code } = await serviceInstance.getCode();
      return res.status(200).json({ code: 200, data: code });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/count', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const serviceInstance = Container.get(JxCfdService);
      const { count } = await serviceInstance.countCode();
      return res.status(200).json({ code: 200, count });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/remove', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    try {
      const serviceInstance = Container.get(JxCfdService);
      const { msg } = await serviceInstance.removeCode();
      return res.status(200).json({ code: 200, msg });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};

import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const ci = {
    name: 'ci',
    model: require('../models/ci').default,
  };
  const ddFactory = {
    name: 'ddFactory',
    model: require('../models/ddFactory').default,
  };
  const ddXw = {
    name: 'ddXw',
    model: require('../models/ddXw').default,
  };
  const jxFactory = {
    name: 'jxFactory',
    model: require('../models/jxFactory').default,
  };
  const jxStory = {
    name: 'jxStory',
    model: require('../models/jxStory').default,
  };
  const jxFactoryTuan = {
    name: 'jxFactoryTuan',
    model: require('../models/jxFactoryTuan').default,
  };
  const lunYu = {
    name: 'lunYu',
    model: require('../models/lunYu').default,
  };
  const shi = {
    name: 'shi',
    model: require('../models/shi').default,
  };
  const shiJing = {
    name: 'shiJing',
    model: require('../models/shiJing').default,
  };
  const yiYan = {
    name: 'yiYan',
    model: require('../models/yiYan').default,
  };
  const jxCfd = {
    name: 'jxCfd',
    model: require('../models/jxCfd').default,
  };
  const jxNc = {
    name: 'jxNc',
    model: require('../models/jxNc').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      ci,
      ddFactory,
      ddXw,
      jxFactory,
      lunYu,
      shi,
      shiJing,
      yiYan,
      jxFactoryTuan,
      jxStory,
      jxCfd,
      jxNc
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

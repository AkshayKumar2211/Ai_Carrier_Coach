import { NestFactory } from '@nestjs/core';
import { CompanyModule } from './company.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'catalog';

  const logger = new Logger('CompanyBootstrap');

  const rmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';

  const queue = process.env.CATALOG_QUEUE ?? 'company_queue';

  //create an microservices instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CompanyModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );


  app.enableShutdownHooks();

  await app.listen();

  logger.log(`Company RMQ listening on queue ${queue} via ${rmqUrl}`);
}
bootstrap();

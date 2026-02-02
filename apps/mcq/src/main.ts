import { NestFactory } from '@nestjs/core';
import { McqModule } from './mcq.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger=new Logger("MCQBOOTSTRAP");

  const rmqUrl='amqp://localhost:5672';

  const queue="mcq_queue";

  const app=await NestFactory.createMicroservice<MicroserviceOptions>(
    McqModule,
    {
      transport:Transport.RMQ,
      options:{
        urls:[rmqUrl],
        queue,
        queueOptions:{
          durable:false,
        }
      }
    }

  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Catalog RMQ listening on queue ${queue} via ${rmqUrl}`);
}
bootstrap();

 

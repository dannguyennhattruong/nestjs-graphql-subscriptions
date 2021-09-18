import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PersonModule } from './person/person.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/three-in-one-db'),
    PersonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      installSubscriptionHandlers: true,
      // subscriptions: {
      //   'graphql-ws': true
      // },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
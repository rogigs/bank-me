import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './config/prisma.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { PayableModule } from './modules/payable/payable.module';
import { UserModule } from './modules/user/user.module';
import { PositiveNumberPipe } from './pipes/PositiveNumberPipe.pipe';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // it's considered best practice to implement it at the load balancer
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      },
    ]),
    PayableModule,
    AssignorModule,
    AuthModule,
    UserModule,
    EmailModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PositiveNumberPipe,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

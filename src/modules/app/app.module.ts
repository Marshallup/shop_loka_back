import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/controllers/app/app.controller';
import { GoodModule } from '../good/good.module';
import { typeormConfig } from '@/config/typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    GoodModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

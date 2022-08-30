import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/controllers/app/app.controller';
import { typeormConfig } from '@/config/typeorm-config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeormConfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

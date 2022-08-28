import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/controllers/app/app.controller';
import { configDataSource } from '@/database/typeorm-data-source';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(configDataSource)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

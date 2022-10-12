import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app/app.controller';
import { GoodModule } from '@/good/good.module';
import { typeormConfig } from '@/config/typeorm-config';
import { join } from 'path';
import { FOLDERS_NAMES } from '@/enums/folder-names.enum';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    GoodModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', FOLDERS_NAMES.CLIENT),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
      serveRoot: `/${FOLDERS_NAMES.CLIENT}/`,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

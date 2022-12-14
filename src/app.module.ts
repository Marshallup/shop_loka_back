import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { GoodModule } from '@/good/good.module';
import { typeormConfig } from '@/config/typeorm-config';
import { join } from 'path';
import { FOLDERS_NAMES } from '@/enums/folder-names.enum';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CartModule } from '@/cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    GoodModule,
    CartModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', FOLDERS_NAMES.CLIENT),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
      serveRoot: `/${FOLDERS_NAMES.CLIENT}/`,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

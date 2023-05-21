import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { userController } from 'src/Controller/user.controller';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UserService } from 'src/Service/user.service';
import { jwtConstants } from 'src/Validator/secretKey';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400' },
    }),
  ],
  controllers: [userController],
  providers: [UserService, RolesGuard],
})
export class UserModule {}

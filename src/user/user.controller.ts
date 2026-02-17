import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  me(@Req() request: { user?: { id?: string } }) {
    return this.userService.getProfile(request.user?.id ?? '');
  }

  @Patch('me')
  updateMe(
    @Req() request: { user?: { id?: string } },
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(request.user?.id ?? '', dto);
  }
}

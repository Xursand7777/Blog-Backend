import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../service/auth.service";
import { AdminRepository } from "../../admin/service/admin.repository";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private adminRepository: AdminRepository) {

  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin = await this.adminRepository.find(req.user.id)
    return this.authService.login(admin)
  }
}

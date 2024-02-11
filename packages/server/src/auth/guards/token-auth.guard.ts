import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  private readonly token: string = 'тест';
  private readonly salt: string = 'salt'; // salt

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization && this.verifyToken(authorization)) {
      return true;
    }

    throw new UnauthorizedException();
  }

  private verifyToken(authorizationHeader: string): boolean {
    const token = authorizationHeader.split(' ')[1];

    // Check token logic
    const saltedToken = this.salt + this.token;
    const isTokenValid = token === saltedToken;

    return isTokenValid;
  }
}

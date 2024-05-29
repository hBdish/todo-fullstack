import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

const SECRET_KEY = 'test';
const SALT = 'test';

@Injectable()
export class TokenGuard implements CanActivate {
  private readonly token: string = SECRET_KEY;
  private readonly salt: string = SALT;

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
    const saltedToken = this.salt + this.token;
    const isTokenValid = token === saltedToken;

    return isTokenValid;
  }
}

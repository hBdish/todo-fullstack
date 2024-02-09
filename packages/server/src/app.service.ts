import { Injectable } from '@nestjs/common';
import { urlJoin } from "url-join";

@Injectable()
export class AppService {
  getHello(): string {
    return urlJoin( './src/tests');
  }
}

import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({}),
    }),
  ],
  exports: [],
})
export class SharedModule {}

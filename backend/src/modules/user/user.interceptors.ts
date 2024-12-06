import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserDTO } from './DTO/user.DTO';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: UserDTO | UserDTO[]) => {
        if (Array.isArray(data)) {
          return data.map((values) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPassword } = values;
            return userWithoutPassword;
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = data;
        return userWithoutPassword;
      }),
    );
  }
}

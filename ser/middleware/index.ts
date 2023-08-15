import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PaginateInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      map((data: [any[], number]) => {
        const req: Request = context.switchToHttp().getRequest();
        return {
          data,
          url: req.url,
          date: new Date().getTime(),
        };
      })
    );
  }
}

import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main/app.module";
import { PaginateInterceptor } from "./middleware";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalInterceptors(new PaginateInterceptor());
  await app.listen(3000);
}
bootstrap();

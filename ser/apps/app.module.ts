import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppSchema } from "./app.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "apps", schema: AppSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

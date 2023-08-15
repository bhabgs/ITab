import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppModule } from "../apps/app.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://192.168.5.66:27017", {
      dbName: "ITab",
      user: "root",
      pass: "123456",
    }),
    AppModule,
  ],
  controllers: [], // AppController
  providers: [], // AppService
})
export class MainModule {}

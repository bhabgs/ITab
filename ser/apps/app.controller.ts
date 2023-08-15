import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateApp } from "./app.dto";

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get(): Promise<Array<CreateApp>> {
    return await this.appService.findAll();
  }

  @Get(":id")
  getApp(@Param("id") id: string) {
    return this.appService.getApp(id);
  }

  @Post()
  addApp(@Body() request: CreateApp) {
    return this.appService.addApp(request);
  }

  @Delete(":id")
  removeApp(@Param("id") id: string) {
    return this.appService.removeApp(id);
  }

  @Put(":id")
  updateApp(@Param("id") id: string, @Body() request: CreateApp) {
    return this.appService.updateApp(id, request);
  }
}

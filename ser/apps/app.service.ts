import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateApp } from "./app.dto";

@Injectable()
export class AppService {
  constructor(
    @InjectModel("apps") private readonly appModel: Model<CreateApp>
  ) {}

  async findAll(): Promise<Array<CreateApp>> {
    const apps = await this.appModel.find().exec();
    return apps;
  }

  async removeApp(id: string) {
    try {
      const remove = await this.appModel.findByIdAndDelete(id).exec();
    } catch (error) {}
  }

  async addApp(body: CreateApp) {
    // 如果存在就不添加
    if (await this.appModel.findOne({ name: body.name })) {
      return { message: "已存在" };
    }
    return await this.appModel.create(body);
  }

  async updateApp(id: string, body: CreateApp) {
    return await this.appModel.findByIdAndUpdate(id, body).exec();
  }

  async getApp(id: string) {
    return await this.appModel.findById(id).exec();
  }
}

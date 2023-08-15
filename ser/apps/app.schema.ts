import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AppDocument = App & Document;

@Schema()
export class App {
  // 名称
  @Prop()
  name: string;

  // 地址
  @Prop()
  url: string;

  @Prop()
  groupType: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;
}

export const AppSchema = SchemaFactory.createForClass(App);

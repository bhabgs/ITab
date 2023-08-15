import instance, { CommonRes } from "./_instance";

export interface IAppItem {
  _id: string;
  name: string;
  groupType?: string;
  url?: string;
  description: string;
  icon: string;
}

export type AppList = IAppItem[];

export const getAppList = () =>
  instance.get<AppList, CommonRes<AppList>>("/app");

export const insertApp = (app: IAppItem) => instance.post("/app", app);

export const updateApp = (id: string, app: IAppItem) =>
  instance.put(`/app/${id}`, app);

export const deleteApp = (id: string) => instance.delete(`/app/${id}`);

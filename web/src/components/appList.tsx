import React, { useMemo } from "react";
import { Row, Col } from "antd";
import { AppList, IAppItem } from "@/api";
import AppItem from "./appItem";

type GroupedList = {
  groupType: string;
  list: AppList;
}[];

type Props = {
  list: AppList;
  onDelete: (app: IAppItem) => void;
  onEdit: (app: IAppItem) => void;
};

const appList: React.FC<Props> = (props) => {
  const groupedApps = useMemo<GroupedList>(() => {
    const res: GroupedList = [];
    for (const app of props.list) {
      const groupType = app.groupType || "未分组";
      let group = res.find((item) => item.groupType === groupType);
      if (!group) {
        group = {
          groupType,
          list: [],
        };
        res.push(group);
      }
      group.list.push(app);
    }
    return res;
  }, [props.list]);

  return (
    <div className="app-list">
      {groupedApps.map((group) => (
        <div key={group.groupType} className="group-container">
          <div className="group-title">{group.groupType}</div>
          <div className="list">
            <Row gutter={[16, 24]}>
              {group.list.map((item) => (
                <Col key={item._id} xl={6} md={8} sm={12} xs={24}>
                  <AppItem
                    record={item}
                    onDelete={() => props.onDelete(item)}
                    onEdit={() => props.onEdit(item)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
    </div>
  );
};

export default appList;

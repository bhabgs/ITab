import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, Space, message, Spin } from "antd";
import AppList from "./components/appList";
import AddAppModal from "./components/addAppModal";
import * as api from "@/api";

const App: React.FC = () => {
  const [appList, setAppList] = useState<api.AppList>([]);
  const [loading, setLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editApp, setEditApp] = useState<api.IAppItem | undefined>();

  const getAppList = async () => {
    setLoading(true);
    try {
      const { data } = await api.getAppList();
      setAppList(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppList();
  }, []);

  const groupList = useMemo(() => {
    const res: string[] = [];
    for (const app of appList) {
      if (app.groupType && !res.includes(app.groupType)) {
        res.push(app.groupType);
      }
    }
    return res;
  }, [appList]);

  const handleDeleteApp = async (app: api.IAppItem) => {
    Modal.confirm({
      title: "提示",
      content: `确定删除应用“${app.name}”吗？`,
      async onOk() {
        await api.deleteApp(app._id);
        message.success("删除成功");
        getAppList();
      },
    });
  };

  const handleEditApp = (app: api.IAppItem) => {
    setEditApp(app);
    setAddOpen(true);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="title">应用管理</div>
        <div className="operation">
          <Button
            type="primary"
            onClick={() => {
              setEditApp(undefined);
              setAddOpen(true);
            }}
          >
            添加应用
          </Button>
        </div>
      </div>
      <div className="content">
        <Spin spinning={loading}>
          <AppList
            list={appList}
            onDelete={handleDeleteApp}
            onEdit={handleEditApp}
          />
        </Spin>
      </div>

      <AddAppModal
        open={addOpen}
        record={editApp}
        groupList={groupList}
        onChange={setAddOpen}
        onRefresh={getAppList}
      />
    </div>
  );
};

export default App;

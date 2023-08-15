import React, { MouseEvent } from "react";
import { IAppItem } from "@/api";
import { Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  record: IAppItem;
  onDelete: () => void;
  onEdit: () => void;
}

const AppItem: React.FC<Props> = (props) => {
  const { record } = props;
  const { name, url, description } = record;

  const onClick = () => {
    window.open(url, "_BLANK");
  };

  const onEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    props.onEdit();
  };

  const onDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    props.onDelete();
  };

  return (
    <div className="app-item" onClick={onClick}>
      <div className="title">{name}</div>
      <div className="desc">{description || "暂无描述"}</div>

      <div className="operation">
        <Space>
          <EditOutlined color="#cf1322" onClick={onEditClick} />
          <DeleteOutlined color="#1677ff" onClick={onDeleteClick} />
        </Space>
      </div>
    </div>
  );
};

export default AppItem;

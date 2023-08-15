import React, { useEffect, useMemo } from "react";
import { Modal, Form, Input, Select, AutoComplete, message } from "antd";
import * as api from "@/api";

interface Props {
  open: boolean;
  record?: api.IAppItem;
  onChange: (val: boolean) => void;
  onRefresh: () => void;
  groupList: string[];
}

const addAppModal: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const isAdd = useMemo(() => !props.record, [props.record]);

  useEffect(() => {
    if (props.open && !isAdd) {
      const copyRecord = { ...props.record };
      form.setFieldsValue(copyRecord);
    }
  }, [props.open]);

  const handleSave = async (values: any) => {
    await form.validateFields();
    let data;
    if (isAdd) {
      data = await api.insertApp(values);
    } else {
      data = await api.updateApp(props.record._id, values);
    }
    if (data.message) {
      message.error(data.message);
    } else {
      message.success("保存成功");
      props.onRefresh();
      props.onChange(false);
    }
  };

  const onClose = () => {
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="应用管理"
        open={props.open}
        afterClose={onClose}
        onCancel={() => props.onChange(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} labelCol={{ span: 4 }} onFinish={handleSave}>
          <Form.Item
            name="name"
            label="名字"
            rules={[{ required: true, message: "请输入名字" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: "请输入URL" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input></Input>
          </Form.Item>
          <Form.Item name="groupType" label="分类">
            <AutoComplete
              options={props.groupList.map((item) => ({
                label: item,
                value: item,
              }))}
            ></AutoComplete>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default addAppModal;

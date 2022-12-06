import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useFetchHomworkGroup, useCreateHomeworkkGroup } from "../../api/homework";
import { Button, message, Space, Table } from 'antd'

export default function GroupSection({ user, homework }) {

  const navigate = useNavigate();
  const fetchHomeworkGroup = useFetchHomworkGroup();
  const createHomeworkGroup = useCreateHomeworkkGroup();

  const [messageApi, contextHolder] = message.useMessage();
  const [subGroup, setSubGroup] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _subGroup = await fetchHomeworkGroup.execute(homework._id, user.token);
        setSubGroup(_subGroup);
        setDataSource(_subGroup.group)
        console.log(_subGroup.group);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const genGroup = async () => {
    try {
      messageApi.loading('creating group...', 1);
      let _group = await createHomeworkGroup.execute(homework._id, user.token);
      console.log(_group);
      messageApi.success('success!', 1)
        .then(() => navigate(0));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Space
      style={{ width: '100%' }}
      size="small"
      direction="vertical"
    >
      {contextHolder}
      <Button
        type="dashed"
        disabled={subGroup ? true : false}
        onClick={genGroup}
      >
        Generate Group
      </Button>

      { subGroup && <GroupTable dataSource={dataSource} /> }
    </Space>
  );
}

const GroupTable = ({ dataSource }) => (
  <Table 
    columns={[
      {
        title: 'Submitter',
        dataIndex: 'submitter',
        key: 'submitter',
        render: (obj) => obj && (obj.display_name || obj.username)
      },
      {
        title: 'Grader',
        dataIndex: 'grader',
        key: 'grader',
        render: (obj) => obj && (obj.display_name || obj.username)
      }
    ]}
    dataSource={dataSource}
  />
)

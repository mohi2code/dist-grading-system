import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useFetchByHomework } from '../../api/submission'
import { Button, Table, Tag } from 'antd'

export default function SubmissionsSection({ user, homework }) {

  const navigate = useNavigate();
  const fetchByHomework = useFetchByHomework();

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _submissions = await fetchByHomework.execute(homework._id, user.token);
        console.log(_submissions);
        setSubmissions(_submissions);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <Table 
      style={{width: '100%'}}
      columns={[
        {
          title: 'Submitter',
          dataIndex: 'submitted_by',
          key: 'submitted_by',
          render: (submitted_by) => (
            <p key={submitted_by._id}>{submitted_by ? submitted_by.display_name : submitted_by.username}</p>
          )
        }, 
        {
          title: 'Grade',
          dataIndex: 'grade',
          key: 'grade',
          render: (grade) => (
            <p>{grade || <Tag>not graded yet</Tag>}</p>
          )
        },
        {
          title: 'Graded By',
          dataIndex: 'graded_by',
          key: 'graded_by',
          render: (graded_by) => (
            graded_by && <p key={graded_by._id}>{graded_by ? graded_by.display_name : graded_by.username}</p>
          )
        },
        {
          title: "Status",
          key: 'status',
          dataIndex: 'objected',
          render: (objected) => (
            objected ? <Tag color="red" >objected</Tag>: ""
          )
        }, 
        {
          title: '',
          key: 'actions',
          render: (_, sub) => (
            <Button 
              type='link'
              onClick={() => navigate(`/submissions/${sub._id}`)}
            >
              view
            </Button>
          )
        }
      ]}
      dataSource={submissions}
    />
  );
}
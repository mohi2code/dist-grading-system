import { useContext, useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { Dropdown, Layout, Menu, Space, Button, message } from 'antd';
import { PlusOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import LogoDark from '../images/logo-dark.svg';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {

  const navigate = useNavigate()
  const { user, dispatch } = useContext(UserContext);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!user)
      navigate('/auth')

  }, [user])

  const onSideMenuSelect = ({ key }) => {
    switch (key) {
      case 'all-courses':
        navigate('/courses/all');
        break;

      case 'create-course':
        navigate('/courses/new');
        break;
    
      default:
        break;
    }
  }

  const onProfileMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile')
        break;

      case 'logout':
        dispatch({ type: 'destroy-data' })
        messageApi.loading('Logging out...', 1)
          .then(() => messageApi.success('Logged out'))
          .then(() => navigate('/auth'));
        break;
    
      default:
        break;
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      { contextHolder }
      <Sider>
        <Space.Compact 
          style={{ justifyContent: 'center', padding: '1rem 0' }}
          block 
          align='center' 
        >
          <img src={LogoDark} alt="logo" width={100} height={50} />
        </Space.Compact>

        <Menu 
          theme='dark'
          mode='inline'
          items={makeMenuItems(user.role)}
          onSelect={onSideMenuSelect}
        />
      </Sider>

      <Layout>
        <Header>
          <Space
            align='center'
            style={{ width: '100%', justifyContent: 'flex-end' }}
          >
            <Dropdown 
              menu={{
                items: [
                  getItem('Profile', 'profile'),
                  getItem(null, null, null, null, 'divider'),
                  getItem('Log out', 'logout', <PoweroffOutlined />)
                ],
                onClick: onProfileMenuClick
              }}
            >
              <Button 
                style={{color: '#fafafa'}} type="text" size='large'
                icon={<SettingOutlined />}
              >
                {user && (user['display_name'] || user.username)}
              </Button>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '2rem', overflowY: 'scroll' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const makeMenuItems = (role) => [
  getItem('Courses', 'courses', null, [
    getItem('All courses', 'all-courses'),
    role === 'instructor' && getItem('Create course', 'create-course', <PlusOutlined />)
  ]),
  getItem('Homeworks', 'homeworks', null, [
    getItem('All homeworks', 'all-homeworks'),
    role !== 'student' && getItem('Create homework', 'create-homework', <PlusOutlined />)
  ]),
  getItem('Submissions')
]
import { Col, Menu, Row } from 'antd'
import { useState } from 'react'
import LoginForm from '../components/loginForm'
import RegisterForm from '../components/registerForm'
import Logo from '../images/logo.svg'

export default function Auth() {

  const [key, setKey] = useState('login')

  const onSelect = ({ key }) => {
    setKey(key)
  }

  return (
    <Row style={{ height: '100vh'}} >
      <Col style={columnStyle} span={8} offset={8}>
        <div style={header}>
          <img src={Logo} alt="logo" width={200} height={100} />
          <h4 style={header_h4}>A decentralized way of managing homeworks.</h4>
        </div>
        <Menu 
          onSelect={onSelect}
          mode='horizontal'
          defaultSelectedKeys={['login']}
        >
          <Menu.Item key='login'>
            Account Login
          </Menu.Item>
          <Menu.Item key='register'>
            New Account
          </Menu.Item>
        </Menu>

        { key === 'login' ? <LoginForm /> : <RegisterForm /> }

      </Col>
    </Row>
  )
}

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const header = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '2rem'
}

const header_h4 = {
  margin: 0,
  color: '#333'
};

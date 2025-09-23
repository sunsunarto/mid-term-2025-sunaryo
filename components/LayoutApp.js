import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Grid,
  Drawer,
  Button,
} from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Breadcrumbnav from '../components/Breadcrumb.js';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function LayoutApp({ children }) {
  const router = useRouter();
  const path = router.pathname;
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = (
    <Menu
      mode="vertical"
      selectedKeys={[path]}
      style={{ width: '100%' }}
      onClick={() => setDrawerVisible(false)}
    >
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        <Link href="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/events" icon={<CalendarOutlined />}>
        <Link href="/events">Events</Link>
      </Menu.Item>
      <Menu.Item key="/create-event" icon={<PlusCircleOutlined />}>
        <Link href="/create-event">Create Event</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Sider
          width={280}
          style={{
            background: '#f0f2f5',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar size={80} style={{ backgroundColor: '#1890ff' }}>
            E
          </Avatar>
          <Title level={5} style={{ marginTop: 12, textAlign: 'center' }}>
            Event Manager
          </Title>
          <Text type="secondary" style={{ textAlign: 'center' }}>
            Manage your events
          </Text>
          <div style={{ marginTop: 32, width: '100%' }}>{menuItems}</div>
        </Sider>
      )}

      {/* Drawer for mobile */}
      {isMobile && (
        <>
          <Button
            icon={<MenuOutlined />}
            type="text"
            style={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1000,
              background: '#fff',
              borderRadius: 4,
            }}
            onClick={() => setDrawerVisible(true)}
          />
          <Drawer
            title="Event Manager"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            {menuItems}
          </Drawer>
        </>
      )}

      {/* Main content */}
      <Content
        style={{
          background: '#e6f7ff',
          padding: isMobile ? '24px 16px' : '40px',
          flex: 1,
        }}
      >
        <Breadcrumbnav />
        {children}
      </Content>
    </Layout>
  );
}

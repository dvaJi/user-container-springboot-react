import { Breadcrumb, Button, Dropdown, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user";

const { Header, Footer, Content } = Layout;

const menu = (onClick) => (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Cerrar Sesión</Menu.Item>
  </Menu>
);

function BaseLayout({ children }) {
  const location = useLocation();
  const [user, logout] = useCurrentUser();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">App</div>
        {user && (
          <div className="header-user-actions">
            <Dropdown trigger={['click']} overlay={menu(logout)}>
              <span>{user.email}</span>
            </Dropdown>
          </div>
        )}
        {/* <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users">Lista Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users">Lista Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users">Lista Usuarios</Link>
          </Menu.Item>
        </Menu> */}
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ textTransform: "capitalize" }}>
              {location.pathname.replace("/", "")}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default BaseLayout;

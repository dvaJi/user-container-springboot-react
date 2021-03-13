import { Card, Layout } from "antd";

const { Header, Footer, Content } = Layout;

function AuthLayout({ children }) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">App</div>
      </Header>
      <Content>
        <Card className="Login" style={{ width: 400, margin: "100px auto" }}>
          {children}
        </Card>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default AuthLayout;

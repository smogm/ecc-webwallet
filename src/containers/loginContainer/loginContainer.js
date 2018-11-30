import React, { PureComponent } from 'react'; 
import { Layout } from 'antd';

const { Content, Header } = Layout;

class loginContainer extends PureComponent {
  render () {
    return (
      <div className="block">
        <Layout>
          <Header className="header"></Header>
          <Layout>
            <Content className="main">
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

export default loginContainer;
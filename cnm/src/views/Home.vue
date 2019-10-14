<template>
  <Layout class="home layout" style="heigth:" >
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">后台权限管理</div>
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              权限管理
            </template>

            <MenuItem name="1-1">泽鹏的权限管理</MenuItem>
            <MenuItem name="1-2">天林的权限管理</MenuItem>
            <MenuItem name="1-3">国庆的权限管理</MenuItem>
          </Submenu>
          <!-- <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu> -->
        </Menu>
      </Sider>
      <Layout :style="{ padding: '0 24px 24px' }">
        <Content
          :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
        >
          <div id="app">
            <div id="nav"></div>

            <router-view />
          </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
h2 {
  color: #fff;
  text-align: center;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  color: #fff;
  line-height: 30px;
  text-align: center;
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.gnl {
  display: flex;
  padding: 20px;
  button {
    width: 60px;
    margin-left: 30px;
  }
}
</style>

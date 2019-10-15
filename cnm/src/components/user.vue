<template>
  <div class="userlist">
    <!-- <template> -->
      <Button  type="error" @click="modal1 = true">添加</Button>
    <Modal
        title="添加用户"
        @on-ok="ok"
        v-model="modal1">
        <Form v-model="formLeft" label-position="left" :label-width="100" >
          <FormItem label="用户名:" >
            <Input v-model="formLeft.name" />
        </FormItem>
          <FormItem label="电话:" >
            <Input v-model="formLeft.phone" />
        </FormItem>
          <FormItem label="邮箱" >
            <Input v-model="formLeft.mail" />
        </FormItem>
        </Form>
    </Modal>
    <Input
      v-model="params.q"
      style="width: 300px"
      search
      enter-button
      placeholder="搜索"
      @on-search="loadData"
    />
     
<!-- </template> -->
<!-- <tr> -->
    <Table stripe :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="action">
              <Button @click="bianji(row)" class="a">编辑</Button>
    <Modal
        title="修改用户"
        @on-ok="editData(formData)"
        @on-cancel="cancel"
        v-model="modal2">
        <Form v-model="formData" label-position="left" :label-width="100" >
          <FormItem label="用户名:" >
            <Input v-model="formData.name" />
        </FormItem>
          <FormItem label="电话:" >
            <Input v-model="formData.phone" />
        </FormItem>
          <FormItem label="邮箱" >
            <Input v-model="formData.mail" />
        </FormItem>
        </Form>
    </Modal>
            <Button type="error" @click="remove(row,index)"  size="small">删除</Button>
      </template>

    </Table>
       <Page
      @on-change="changePage"
      :total="total"
      :current="params._page"
      :page-size="params._limit"
    ></Page>
  </div>
</template>

<script>
import service from "../service";
import axios from "axios";
export default {
  name: "userlist",
  data() {
    return {
      modal1: false,
      modal2: false,
      formLeft: {
        name:"",
        phone: "",
        mail:""
      },
      formData: {
        name:"",
        phone: "",
        mail:""
      },
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "名字",
          key: "name"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "邮箱",
          key: "mail"
        },
       
        {
          title: "编辑",
          width: 150,
          slot: "action"
        }
      ],
      params: {
        _limit: 6,
        _page: 1,
        q: ""
      },
      total: 0,
      data: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    editData(row) {
      console.log(row);
      console.log(this.formData)
      axios
       .put(`http://localhost:8888/per/user/${row.id}`, this.formData)
      .then(res=> {
        let indexdata = this.data.findIndex(row => res.data.id === row.id);
        console.log(res.data)
        console.log(row)
        this.$Message.success("编辑成功");
        this.data.splice(indexdata, 1, res.data);
      }).catch(()=> {
        this.$Mssage.success("编辑失败")
      });
    },
    cancel(){
      this.loadData();
    },
    bianji(row) {
     this.modal2 = true;
    //  console.log(row)
    //     return axios
    //   .get("http://localhost:8888/per/user/" + row.id)
    //   .then(res => {
    //     console.log(res.data);
    //     this.formData.name = res.data.name
    //     this.formData.phone = res.data.phone
    //     this.formData.mail = res.data.mail
        this.formData = { ...row };
      // })
      // .catch(e => {
        // console.log(e);
      // });
    },
    ok() {
    axios 
     .post("http://localhost:8888/per/user",this.formLeft)
     .then(res => {
       this.data.push(res.data)
       console.log(this.data);
        //  this.$Message.success("添加成功");
       this.loadData();
     }).catch(()=>{});
    },
   remove(row, index) {//删除
    return axios
      .delete("http://localhost:8888/per/user/" + row.id)
      .then(res => {
        this.data.splice(index, 1);
        this.$Message.success("删除成功");
      })
      .catch(e => {
        console.log(e);
      });
  },
    changePage(page) {
      this.params._page = page;
      this.loadData();
    },
    loadData() {
      service.getdata(this.params).then(res => {
        this.data = res.data;
        this.total = parseInt(res.headers["AUTH_TOKEN"]);
        // console.log(this.total);
        console.log(this.data);
      });
    }
  }
};
</script>

<style lang='scss'>
  .a {
    height: 24px !important ;
  }
</style>

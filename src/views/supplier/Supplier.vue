<template>
  <div class="supplier-list">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      label-width="90px"
    >
      <el-form-item label="用户手机号">
        <el-input
          v-model="searchForm.userPhone"
          placeholder="请输入用户手机号"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
        >新增用户</el-button
      >
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="userData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="userId"
          label="用户id"
          align="center"
        ></el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center">
        </el-table-column>
        <el-table-column prop="userPhone" label="用户手机号" align="center">
        </el-table-column>
        <el-table-column prop="userAddress" label="用户地址" align="center">
        </el-table-column>
        <el-table-column prop="userDescribe" label="用户描述" align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              plain
              @click="update1(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              @click="delete1(scope.row.userId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page.sync="searchForm.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" prop="userPhone">
          <el-input v-model="userForm.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="userAddress">
          <el-input
            v-model="userForm.userAddress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户描述" prop="userDescribe">
          <el-input
            v-model="userForm.userDescribe"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            queryList();
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, userDelete, userUpdate, userAdd } from '@/api/user';
import Message from '@/util/message';
import { mapState } from 'vuex';
export default {
  name: 'UserList',
  data() {
    return {
      searchForm: {
        userPhone: '',
        page: 1,
        size: 5
      },
      total: 0,
      userData: [],
      dialogFormVisible: false,
      userForm: {
        userName: '',
        userPhone: '',
        userAddress: '',
        userDescribe: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'change' }
        ],
        userPhone: [
          { required: true, message: '请输入用户手机号', trigger: 'change' }
        ],
        userAddress: [
          { required: true, message: '请输入用户地址', trigger: 'change' }
        ],
        userDescribe: [
          { required: true, message: '请输入用户描述', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.queryList();
    },
    resetForm() {
      this.searchForm = {
        userPhone: '',
        page: 1,
        size: 5
      };
      this.queryList();
    },
    handleSizeChange(val) {
      this.searchForm.size = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.queryList();
    },
    async queryList() {
      const params = {
        adminId: this.adminId,
        ...this.searchForm
      };

      // 切换分页size时处理不合理参数
      if ((params.page - 1) * params.size > this.total) {
        return;
      }
      const res = await userList(params);
      if (res.code === 200) {
        console.log(res);
        this.total = res.data.total;
        this.userData = res.data.userList;
      } else {
        Message('error', res.message);
      }
    },
    async delete1(userId) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            adminId: this.adminId,
            userId
          };
          userDelete(params).then((res) => {
            if (res.code === 200) {
              Message('success', '删除成功');
            } else {
              Message('error', res.message);
            }
          });
        })
        .catch(() => {});
    },
    update1(userForm) {
      this.dialogFormVisible = true;
      this.userForm = userForm;
    },
    async update() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.userForm
          };
          const res = await userUpdate(params);
          if (res.code === 200) {
            Message('success', '添加成功');
          } else {
            Message('error', res.message);
          }
          this.dialogFormVisible = false;
          this.userForm = {
            userName: '',
            userPhone: '',
            userAddress: '',
            userDescribe: ''
          };
          this.queryList();
        }
      });
    },
    async add() {
      this.$refs.form.validate(async (valid) => {
        console.log(valid, this.userForm);
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.userForm
          };
          const res = await userAdd(params);
          if (res.code === 200) {
            Message('success', '添加成功');
          } else {
            Message('error', res.message);
          }
          this.dialogFormVisible = false;
          this.userForm = {
            userName: '',
            userPhone: '',
            userAddress: '',
            userDescribe: ''
          };
          this.queryList();
        }
      });
    },
    check() {
      if (this.userForm.userId) {
        this.update();
      } else {
        this.add();
      }
    }
  },
  computed: {
    ...mapState(['adminId'])
  },
  created() {
    this.queryList();
  }
};
</script>

<style lang="scss">
.supplier-list {
  > .el-form {
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    .el-form-item {
      float: left;
      margin-bottom: 10px;
    }
    .form-button {
      float: right;
      display: flex;
    }
  }
  .operation {
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    .el-button-group {
      margin-right: 20px;
    }
  }
  .table {
    background-color: #ffffff;
    padding-left: 20px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
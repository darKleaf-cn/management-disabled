<template>
  <div class="supplier-list">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      label-width="150px"
    >
      <el-form-item label="供应商联系方式">
        <el-input
          v-model="searchForm.supplierPhone"
          placeholder="请输入供应商联系方式"
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
        >新增供应商</el-button
      >
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="supplierData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="supplierId"
          label="供应商id"
          align="center"
        ></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称" align="center">
        </el-table-column>
        <el-table-column
          prop="supplierPhone"
          label="供应商联系方式"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="supplierAddress"
          label="供应商地址"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="supplierDescribe"
          label="供应商描述"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="supplierGoods"
          label="供应商经营商品"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="item in scope.row.supplierGoods"
              :key="item.catalogId"
              >{{ item.catalogName }}</el-tag
            >
          </template>
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
              @click="delete1(scope.row.supplierId)"
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
    <el-dialog title="供应商信息" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form
        :model="supplierForm"
        label-width="150px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="supplierForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系方式" prop="supplierPhone">
          <el-input
            v-model="supplierForm.supplierPhone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商地址" prop="supplierAddress">
          <el-input
            v-model="supplierForm.supplierAddress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商描述" prop="supplierDescribe">
          <el-input
            v-model="supplierForm.supplierDescribe"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商经营商品" prop="supplierGoods">
          <el-select
            v-model="supplierForm.supplierGoods"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in catalogs"
              :key="item.catalogId"
              :label="item.catalogName"
              :value="item.catalogId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  supplierList,
  supplierDelete,
  supplierUpdate,
  supplierAdd
} from '@/api/supplier';
import Message from '@/util/message';
import { mapState } from 'vuex';
import catalogs from '../../assets/catalog';
export default {
  name: 'SupplierList',
  data() {
    return {
      searchForm: {
        supplierPhone: '',
        page: 1,
        size: 5
      },
      total: 0,
      supplierData: [],
      dialogFormVisible: false,
      supplierForm: {
        supplierName: '',
        supplierPhone: '',
        supplierAddress: '',
        supplierDescribe: '',
        supplierGoods: []
      },
      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'change' }
        ],
        supplierPhone: [
          { required: true, message: '请输入供应商联系方式', trigger: 'change' }
        ],
        supplierAddress: [
          { required: true, message: '请输入供应商地址', trigger: 'change' }
        ],
        supplierDescribe: [
          { required: true, message: '请输入供应商描述', trigger: 'change' }
        ],
        supplierGoods: [
          {
            required: true,
            message: '供应商经营商品不能为空',
            trigger: 'change'
          }
        ]
      },
      catalogs: catalogs
    };
  },
  methods: {
    submitForm() {
      this.queryList();
    },
    resetForm() {
      this.searchForm = {
        supplierPhone: '',
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
      const res = await supplierList(params);
      if (res.code === 200) {
        console.log(res);
        this.total = res.data.total;
        this.supplierData = res.data.supplierList;
      } else {
        Message('error', res.message);
      }
    },
    async delete1(supplierId) {
      this.$confirm('此操作将删除该供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            adminId: this.adminId,
            supplierId
          };
          supplierDelete(params).then((res) => {
            if (res.code === 200) {
              Message('success', '删除成功');
            } else {
              Message('error', res.message);
            }
						this.queryList();
          });
        })
        .catch(() => {});
    },
    update1(supplierForm) {
      this.dialogFormVisible = true;
			supplierForm = JSON.parse(JSON.stringify(supplierForm));
      const arr = supplierForm.supplierGoods.map((item) => item.catalogId);
      this.supplierForm = supplierForm;
      this.supplierForm.supplierGoods = arr;
    },
    async update() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.supplierForm
          };
          console.log(params);
          const res = await supplierUpdate(params);
          if (res.code === 200) {
            Message('success', '添加成功');
          } else {
            Message('error', res.message);
          }
          this.dialogFormVisible = false;
          this.supplierForm = {
            supplierName: '',
            supplierPhone: '',
            supplierAddress: '',
            supplierDescribe: '',
            supplierGoods: []
          };
          this.queryList();
        }
      });
    },
    async add() {
      this.$refs.form.validate(async (valid) => {
        console.log(valid, this.supplierForm);
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.supplierForm
          };
          const res = await supplierAdd(params);
          if (res.code === 200) {
            Message('success', '添加成功');
          } else {
            Message('error', res.message);
          }
          this.dialogFormVisible = false;
          this.supplierForm = {
            supplierName: '',
            supplierPhone: '',
            supplierAddress: '',
            supplierDescribe: '',
            supplierGoods: []
          };
          this.queryList();
        }
      });
    },
    check() {
      if (this.supplierForm.supplierId) {
        this.update();
      } else {
        this.add();
      }
    },
    cancel() {
      this.dialogFormVisible = false;
      this.supplierForm = {
        supplierName: '',
        supplierPhone: '',
        supplierAddress: '',
        supplierDescribe: '',
        supplierGoods: []
      };
      this.queryList();
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
    .el-tag {
      margin: 2px;
    }
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
  .el-select {
    display: block;
  }
}
</style>

<template>
  <div class="goods-list">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="商品名称">
        <el-input
          v-model="searchForm.goodsName"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="goodsData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="goodsId"
          label="商品id"
          align="center"
        ></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="goodsImage" label="商品图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 50px"
              :src="scope.row.goodsImage"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goodsSupplierName" label="供应商" align="center">
        </el-table-column>
        <el-table-column prop="goodsDescribe" label="商品描述" align="center">
        </el-table-column>
        <el-table-column prop="goodsPrice" label="商品价格" align="center">
        </el-table-column>
        <el-table-column prop="goodsSku" label="商品库存" align="center">
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              plain
              @click="buy1(scope.row.goodsId)"
              >申请</el-button
            >
            <el-button
              type="warning"
              size="small"
              plain
              @click="update1(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              @click="delete1(scope.row.goodsId)"
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
    <el-dialog
      title="商品信息"
      :visible.sync="dialogFormVisible"
      :show-close="false"
    >
      <el-form :model="goodsForm" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品供应商" prop="goodsSupplierId">
          <el-select
            v-model="goodsForm.goodsSupplierId"
            filterable
            placeholder="请选择"
            @change="supplierChange"
          >
            <el-option
              v-for="item in supplierData"
              :key="item.supplierId"
              :label="item.supplierName"
              :value="item.supplierId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="goodsForm.goodsSupplierId"
          label="商品类型"
          prop="goodsCatalogId"
        >
          <el-select v-model="goodsForm.goodsCatalogId" placeholder="请选择">
            <el-option
              v-for="item in catalogs"
              :key="item.catalogId"
              :label="item.catalogName"
              :value="item.catalogId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDescribe">
          <el-input v-model="goodsForm.goodsDescribe"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goodsPrice">
          <el-input
            v-model="goodsForm.goodsPrice"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="goodsSku">
          <el-input
            v-model="goodsForm.goodsSku"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goodsImage">
          <el-upload
            class="upload-demo"
            action="#"
            drag
            :limit="1"
            multiple
            :http-request="Upload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="购买信息" :visible.sync="buyVisible" :show-close="false">
      <el-form :model="buyForm" label-width="100px">
        <el-form-item label="商品数量">
          <el-input
            v-model="buyForm.goodsNum"
            type="number"
            :min="1"
          ></el-input>
        </el-form-item>
        <el-form-item label="购买用户">
          <el-select v-model="buyForm.userId" placeholder="请选择" filterable>
            <el-option
              v-for="item in userData"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyCancel">取 消</el-button>
        <el-button type="primary" @click="buySubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, goodsDelete, goodsUpdate, goodsBuy } from '@/api/goods';
import { userList } from '@/api/user';
import { supplierList } from '@/api/supplier';
import Message from '@/util/message';
import { mapState } from 'vuex';
import catalogs from '../../assets/catalog';
export default {
  name: 'GoodsList',
  data() {
    return {
      searchForm: {
        goodsName: '',
        page: 1,
        size: 5
      },
      total: 0,
      goodsData: [],
      dialogFormVisible: false,
      buyVisible: false,
      goodsForm: {
        goodsId: '',
        goodsName: '',
        goodsDescribe: '',
        goodsSupplierId: '',
        goodsCatalogId: '',
        goodsSku: 0,
        goodsPrice: 0,
        goodsImage: ''
      },
      rules: {
        goodsName: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'change'
          }
        ],
        goodsSupplierId: [
          {
            required: true,
            message: '供应商不能为空',
            trigger: 'change'
          }
        ],
        goodsSku: [
          {
            required: true,
            message: '商品库存不能为空',
            trigger: 'change'
          }
        ],
        goodsDescribe: [
          {
            required: true,
            message: '商品描述不能为空',
            trigger: 'change'
          }
        ],
        goodsCatalogId: [
          {
            required: true,
            message: '商品类型不能为空',
            trigger: 'change'
          }
        ],
        goodsPrice: [
          {
            required: true,
            message: '商品价格不能为空',
            trigger: 'change'
          }
        ],
        goodsImage: [
          {
            required: true,
            message: '商品图片不能为空',
            trigger: 'change'
          }
        ]
      },
      catalogs: catalogs,
      supplierData: [],
      buyForm: {
        goodsId: '',
        goodsNum: 1,
        userId: ''
      },
      userData: []
    };
  },
  methods: {
    submitForm() {
      this.queryList();
    },
    resetForm() {
      this.searchForm = {
        goodsName: '',
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
      const res = await goodsList(params);
      if (res.code === 200) {
        console.log(res);
        this.total = res.data.total;
        this.goodsData = res.data.goodsList;
      } else {
        Message('error', res.message);
      }
    },
    async delete1(goodsId) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            adminId: this.adminId,
            goodsId
          };
          goodsDelete(params).then((res) => {
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
    update1(goodsForm) {
      this.supplierQueryList();
      this.dialogFormVisible = true;
      goodsForm = JSON.parse(JSON.stringify(goodsForm));
      this.goodsForm = goodsForm;
    },
    async update() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.goodsForm
          };
          console.log(params);
          params.goodsPrice = parseInt(params.goodsPrice);
          params.goodsSku = parseInt(params.goodsSku);
          const res = await goodsUpdate(params);
          if (res.code === 200) {
            Message('success', '修改成功');
          } else {
            Message('error', res.message);
          }
          this.dialogFormVisible = false;
          this.goodsForm = {
            goodsId: '',
            goodsName: '',
            goodsDescribe: '',
            goodsSupplierId: '',
            goodsCatalogId: '',
            goodsSku: 0,
            goodsPrice: 0,
            goodsImage: ''
          };
          this.queryList();
        }
      });
    },
    check() {
      this.update();
    },
    cancel() {
      this.dialogFormVisible = false;
      this.goodsForm = {
        goodsId: '',
        goodsName: '',
        goodsDescribe: '',
        goodsSupplierId: '',
        goodsCatalogId: '',
        goodsSku: 0,
        goodsPrice: 0,
        goodsImage: ''
      };
      this.queryList();
    },
    Upload(data) {
      var reader = new FileReader();
      reader.readAsDataURL(data.file);
      const that = this;
      reader.onload = function () {
        that.goodsForm.goodsImage = reader.result;
      };
    },
    async supplierQueryList() {
      const params = {
        adminId: this.adminId,
        page: 1,
        size: 100
      };
      const res = await supplierList(params);
      if (res.code === 200) {
        this.supplierData = res.data.supplierList;
      } else {
        Message('error', res.message);
      }
    },
    supplierChange(value) {
      for (const item of this.supplierData) {
        if (value === item.supplierId) {
          this.catalogs = item.supplierGoods;
          this.goodsForm.goodsCatalogId = '';
          break;
        }
      }
    },
    buy1(goodsId) {
      this.queryUserList();
      this.buyForm.goodsId = goodsId;
      this.buyVisible = true;
    },
    async queryUserList() {
      const params = {
        adminId: this.adminId,
        page: 1,
        size: 100
      };
      const res = await userList(params);
      if (res.code === 200) {
        this.userData = res.data.userList;
      } else {
        Message('error', res.message);
      }
    },
    buyCancel() {
      this.buyForm = {
        goodsId: '',
        goodsNum: 1,
        userId: ''
      };
      this.buyVisible = false;
    },
    async buySubmit() {
      if (!this.buyForm.userId) {
        Message('error', '购买用户不能为空');
        return false;
      }
      const params = {
        adminId: this.adminId,
        ...this.buyForm
      };
      params.goodsNum = parseInt(params.goodsNum);
      const res = await goodsBuy(params);
      if (res.code === 200) {
        Message('success', '购买成功');
      } else {
        Message('error', res.message);
      }
      this.buyCancel();
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
.goods-list {
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

<template>
  <div class="sku-list">
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
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              plain
              @click="skuAdd(scope.row.goodsId)"
              >入库</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              @click="skuCut(scope.row.goodsId)"
              >出库</el-button
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

    <el-dialog :title="title" :visible.sync="dialogVisible" width="20%">
      <el-input-number
        v-model="goodsNum"
        :min="1"
        label="填写数量"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, goodsSkuAdd, goodsSkuCut } from '@/api/goods';
import Message from '@/util/message';
import { mapState } from 'vuex';
export default {
  name: 'SkuList',
  data() {
    return {
			searchForm: {
        goodsName: '',
        page: 1,
        size: 5
      },
      total: 0,
      goodsData: [],
      dialogVisible: false,
      title: '',
      goodsNum: 0,
      goodsId: '',
      key: true
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
    skuAdd(goodsId) {
      this.title = '入库信息';
      this.key = true;
      this.goodsId = goodsId;
      this.dialogVisible = true;
    },
    skuCut(goodsId) {
      this.title = '出库信息';
      this.key = false;
      this.goodsId = goodsId;
      this.dialogVisible = true;
    },
    async submit() {
      const params = {
        adminId: this.adminId,
        goodsId: this.goodsId,
        goodsNum: this.goodsNum
      };
      if (this.key) {
        const res = await goodsSkuAdd(params);
        if (res.code === 200) {
          Message('success', '入库成功');
        } else {
          Message('error', res.message);
        }
      } else {
        const res = await goodsSkuCut(params);
        if (res.code === 200) {
          Message('success', '出库成功');
        } else {
          Message('error', res.message);
        }
      }
			console.log(params)
      this.queryList();
      this.cancel();
    },
    cancel() {
      this.dialogVisible = false;
      this.goodsNum = 0;
      this.goodsId = '';
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
.sku-list {
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

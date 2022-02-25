<template>
  <div class="order-list">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="订单号">
        <el-input
          v-model="searchForm.orderId"
          placeholder="请输入订单号"
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
        :data="orderData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="orderId"
          label="订单号"
          align="center"
        ></el-table-column>
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
        <el-table-column prop="goodsPrice" label="商品价格" align="center">
        </el-table-column>
        <el-table-column prop="goodsNum" label="数量" align="center">
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
  </div>
</template>

<script>
import { orderList } from '@/api/order';
import Message from '@/util/message';
import { mapState } from 'vuex';
export default {
  name: 'SkuList',
  data() {
    return {
      searchForm: {
        orderId: '',
        page: 1,
        size: 5
      },
      total: 0,
      orderData: []
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
      const res = await orderList(params);
      if (res.code === 200) {
        console.log(res);
        this.total = res.data.total;
        this.orderData = res.data.orderList;
      } else {
        Message('error', res.message);
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
.order-list {
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

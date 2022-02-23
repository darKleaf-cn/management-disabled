<template>
  <div class="order-manage">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      label-width="90px"
    >
      <el-form-item label="订单号">
        <el-input
          v-model="searchForm.orderId"
          placeholder="请输入订单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单时间">
        <el-date-picker
          v-model="searchForm.orderDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          v-model="searchForm.orderStatus"
          placeholder="请选择订单状态状态"
        >
          <el-option label="待付款" value="1"></el-option>
          <el-option label="待发货" value="2"></el-option>
          <el-option label="配送中" value="3"></el-option>
          <el-option label="已收货" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button type="primary" icon="el-icon-upload2">上架</el-button>
      <el-button type="primary" icon="el-icon-download">下架</el-button>
      <el-button type="danger" icon="el-icon-edit">删除</el-button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="orderData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          prop="orderId"
          label="订单号"
          
        ></el-table-column>
        <el-table-column
          prop="orderDate"
          label="订单时间"
          
        ></el-table-column>
        <el-table-column prop="orderCommodityName" label="商品" >
          <template></template>
        </el-table-column>
        <el-table-column label="订单状态"  width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderStatus === 1" type="success"
              >待付款</el-tag
            >
            <el-tag v-else-if="scope.row.orderStatus === 2" type="success"
              >待发货</el-tag
            >
            <el-tag v-else-if="scope.row.orderStatus === 3" type="success"
              >配送中</el-tag
            >
            <el-tag v-else type="warning">已收货</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderPrice" label="订单价格"  width="100">
        </el-table-column>
        <el-table-column label="收货信息" width="400">
          <template>
            <strong>湖北省武汉市光谷大道xx花园1栋2单元</strong><br/>
            <span>王先生</span>
            <el-divider direction="vertical"></el-divider>
            <span>13023922329</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)"
              >编辑</el-button
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
  </div>
</template>

<script>
import { orderQueryList } from '@/api/order';
import Message from '@/util/message';
export default {
  name: 'CommodityManage',
  data() {
    return {
      searchForm: {
        orderId: '',
        orderDate: '',
        orderStatus: '',
        page: 1,
        size: 10
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
        orderId: '',
        orderDate: '',
        orderStatus: '',
        page: 1,
        size: 10
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
      const params = this.searchForm;
      if ((params.page - 1) * params.size > this.total) {
        return;
      }
      const res = await orderQueryList(params);
      if (res.code === '200') {
        this.total = res.data.total;
        this.orderData = res.data.data;
        console.log(this.orderData);
      } else {
        Message('error', res.message);
      }
    }
  },
  created() {
    this.queryList();
  }
};
</script>

<style lang="scss">
.order-manage {
  .el-form {
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 10px;
    padding-left: 0;
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
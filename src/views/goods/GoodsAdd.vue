<template>
  <div class="goods-add">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="form.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品供应商" prop="goodsSupplierId">
        <el-select
          v-model="form.goodsSupplierId"
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
        v-show="form.goodsSupplierId"
        label="商品类型"
        prop="goodsCatalogId"
      >
        <el-select v-model="form.goodsCatalogId" placeholder="请选择">
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
        <el-input v-model="form.goodsDescribe"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="goodsPrice">
        <el-input v-model="form.goodsPrice" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="goodsSku">
        <el-input v-model="form.goodsSku" type="number" min="0"></el-input>
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Message from '@/util/message';
import { supplierList } from '@/api/supplier';
import { goodsAdd } from '@/api/goods';
import catalogs from '../../assets/catalog';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
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
      supplierData: []
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const params = {
            adminId: this.adminId,
            ...this.form
          };
          const res = await goodsAdd(params);
          if (res.code === 200) {
            Message('success', '添加成功');
          } else {
            Message('error', res.message);
          }
          this.form = {
            goodsName: '',
            goodsDescribe: '',
            goodsSupplierId: '',
            goodsCatalogId: '',
            goodsSku: 0,
            goodsPrice: 0,
            goodsImage: ''
          };
        }
      });
    },
    reset() {
      this.form = {
        goodsName: '',
        goodsDescribe: '',
        goodsSupplierId: '',
        goodsCatalogId: '',
        goodsSku: 0,
        goodsPrice: 0,
        goodsImage: ''
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
          this.form.goodsCatalogId = '';
          break;
        }
      }
    },
		Upload(data) {
			var reader = new FileReader();
      reader.readAsDataURL(data.file);
      const that = this;
      reader.onload = function () {
        that.form.goodsImage = reader.result;
      };
		}
  },
  computed: {
    ...mapState(['adminId'])
  },
  created() {
    this.supplierQueryList();
  }
};
</script>

<style lang="scss" scoped>
.goods-add {
  display: flex;
  justify-content: center;
  .el-form {
    background-color: #ffffff;
    width: 800px;
    padding: 20px;
    text-align: left;
  }
}
</style>

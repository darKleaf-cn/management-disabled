<template>
  <div class="commodity-create">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="商品名称" prop="commodityName">
        <el-input v-model="form.commodityName"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="commodityDescribe">
        <el-input v-model="form.commodityDescribe"></el-input>
      </el-form-item>
      <el-form-item label="商品类目" prop="commodityCatalog">
        <el-cascader
          v-model="form.commodityCatalog"
          :options="catalogList"
          :props="{
            value: 'catalogId',
            label: 'catalogName',
            checkStrictly: 'true'
          }"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品价格" prop="commodityPrice">
        <el-input v-model="form.commodityPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="commodityStock">
        <el-input v-model="form.commodityStock" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="commodityImage">
        <el-upload class="upload-demo" drag action="/upload-img" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品信息">
        <template>
          <Editor />
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import { catalogQueryList } from '@/api/commodity';
import Message from '@/util/message';

export default {
  data() {
    return {
      form: {
        commodityName: '',
        commodityDescribe: '',
        commodityCatalog: '',
        commodityPrice: ''
      },
      rules: {
        commodityName: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'change'
          }
        ],
        commodityDescribe: [
          {
            required: true,
            message: '商品描述不能为空',
            trigger: 'change'
          }
        ],
        commodityCatalog: [
          {
            required: true,
            message: '商品类目不能为空',
            trigger: 'change'
          }
        ],
        commodityPrice: [
          {
            required: true,
            message: '商品价格不能为空',
            trigger: 'change'
          }
        ],
        commodityImage: [
          {
            required: true,
            message: '商品图片不能为空',
            trigger: 'change'
          }
        ]
      },
      catalogList: []
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
        }
      });
    },
    reset() {},
    async queryCatalogList() {
      const res = await catalogQueryList();
      if (res.code === '200') {
        this.catalogList = res.data.data;
      } else {
        Message('error', res.message);
      }
    }
  },
  components: {
    Editor
  },
  created() {
    this.queryCatalogList();
  }
};
</script>

<style lang="scss" scoped>
.commodity-create {
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
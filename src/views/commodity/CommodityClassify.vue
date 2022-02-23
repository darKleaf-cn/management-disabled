<template>
  <div class="commodity-classify">
    <div class="operation">
      <el-input placeholder="输入关键字进行过滤"> </el-input>
      <el-tree
        :data="catalogList"
        node-key="catalogId"
        :expand-on-click-node="false"
        :props="{ label: 'catalogName' }"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span @click="check(node)">{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(node)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              style="color: #f56c6c"
              @click="() => remove(node)"
            >
              删除
            </el-button>
            <el-button
              type="text"
              size="mini"
              style="color: #e6a23c"
              @click="() => update(node)"
            >
              修改
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="information">
      <el-row>
        <el-button type="primary">添加根类目</el-button>
        <el-button
          type="danger"
          v-show="show.form"
          @click="show.form = !show.form"
          >关闭信息框</el-button
        >
      </el-row>
      <el-row v-show="show.form">
        <div class="form">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类目编号">
              <el-input
                v-model="form.catalogId"
                :disabled="disabled.catalogId"
              ></el-input>
            </el-form-item>
            <el-form-item label="类目名称">
              <el-input
                v-model="form.catalogName"
                :disabled="disabled.catalogName"
              ></el-input>
            </el-form-item>
            <el-form-item label="所处目录">
              <template>
                <el-cascader
                  v-model="form.catalogRoute"
                  :options="catalogList"
                  @change="handleChange"
                  :props="{
                    value: 'catalogId',
                    label: 'catalogName',
                    checkStrictly: 'true'
                  }"
                  :disabled="disabled.catalogRoute"
                ></el-cascader>
              </template>
            </el-form-item>

            <el-form-item v-show="show.submit">
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <el-row v-show="!show.form">
        <el-empty description="暂无需填写信息"></el-empty>
      </el-row>
    </div>
  </div>
</template>

<script>
// let id = 1000;
import { catalogQueryList } from '@/api/commodity';
import Message from '@/util/message';
export default {
  data() {
    return {
      catalogList: [],
      form: {
        catalogId: '',
        catalogName: '',
        catalogRoute: []
      },
      disabled: {
        catalogId: false,
        catalogName: false,
        catalogRoute: false
      },
      show: {
        form: false,
        submit: false
      }
    };
  },

  methods: {
    append(node) {
      this.show.form = true;
      this.show.submit = true;
      this.form = {
        catalogId: '',
        catalogName: '',
        catalogRoute: this.getRoute(node)
      };
      this.disabled = {
        catalogId: true,
        catalogName: false,
        catalogRoute: false
      };
    },

    remove(node) {
      console.log(node);
    },
    update(node) {
      this.show.form = true;
      this.show.submit = true;
      this.form = {
        catalogId: node.data.catalogId,
        catalogName: node.data.catalogName,
        catalogRoute: this.getRoute(node)
      };
      this.disabled = {
        catalogId: true,
        catalogName: false,
        catalogRoute: true
      };
    },
    handleChange(value) {
      console.log(value);
    },
    check(node) {
      this.show.form = true;
      this.show.submit = false;
      this.form = {
        catalogId: node.data.catalogId,
        catalogName: node.data.catalogName,
        catalogRoute: this.getRoute(node)
      };
      this.disabled = {
        catalogId: true,
        catalogName: true,
        catalogRoute: true
      };
    },
    getRoute(node, arr = []) {
      if (node.parent === null) {
        return arr;
      }
      arr.unshift(node.data.catalogId);
      return this.getRoute(node.parent, arr);
    },
    async queryList() {
      const res = await catalogQueryList();
      console.log(res);
      if (res.code === '200') {
        this.catalogList = res.data;
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
.commodity-classify {
  display: flex;
  height: 100%;
  justify-content: center;
  .operation {
    width: auto;
    margin-right: 20px;
    background-color: #ffffff;
    padding: 20px;
    overflow-y: auto;
    .el-input {
      margin-bottom: 20px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      > span {
        &:last-child {
          margin-left: 50px;
        }
      }
    }
  }
  .information {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    .el-row {
      background-color: #ffffff;
      margin-bottom: 20px;
      padding: 20px;
      &:last-child {
        flex: 1;
        margin-bottom: 0;
      }
    }
  }
}
</style>
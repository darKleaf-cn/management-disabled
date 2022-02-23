<template>
  <div id="editor"></div>
</template>

<script>
import WangEditor from 'wangeditor';

export default {
  data() {
    return {
      editor: null,
      data: ''
    };
  },
  mounted() {
    this.editor = new WangEditor('#editor');
    this.editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };
    // this.editor.config.uploadImgServer = '/upload-img';
    this.editor.config.uploadFileName = 'myFile';
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
			console.log(resultFiles)
      // 上传图片，返回结果，将图片插入到编辑器中
      // insertImgFn(imgUrl);
    };

    // 创建编辑器
    this.editor.create();
  }
};
</script>

<style>
</style>
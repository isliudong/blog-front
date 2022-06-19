<template>
  <div id="emain" style="width: 600px;height:400px;">
    123
  </div>
</template>

<script>
import {onMounted} from "vue";
import * as echarts from 'echarts'

export default {
  name: "data_page",
  setup() {
    onMounted(() => {//需要获取到element,所以是onMounted的Hook
      let myChart = echarts.init(document.getElementById("emain"));
      // 绘制图表
      myChart.setOption({
        title: {text: "总用户量"},
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
    });
  },
  components: {},
  mounted() {
  },
};
</script>

<style scoped>

</style>

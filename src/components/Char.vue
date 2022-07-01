<template>
  <div class="hello" ref="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import router from "@/router";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getSiteID", "getData"]),

  mounted() {
    if (localStorage.getItem("leadhit-site-id")) {
      let root = am5.Root.new(this.$refs.chartdiv);

      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
        })
      );

      function convertData(data) {
        const newData = data.map((el) => {
          let newEl = new Date(el.date);
          return {
            date: newEl.getTime(),
            visits: el.visits,
          };
        });
        return newData;
      }

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "zoomX",
        })
      );
      cursor.lineY.set("visible", false);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 40,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "visits",
          valueXField: "date",
        })
      );

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Circle.new(root, {
            radius: 4,
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
            fill: series.get("fill"),
          }),
        });
        ``;
      });

      var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
      tooltip.label.set("text", "{valueY}");

      let newData = convertData(this.getData);
      series.data.setAll(newData);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
    } else {
      router.push({ path: "/" });
    }
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

<style>
.hello {
  width: 100%;
  height: 500px;
}
</style>

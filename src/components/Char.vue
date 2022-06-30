<template>
  <div class="hello" ref="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import router from "@/router";

export default {
  //   beforeMount() {
  //     if (
  //       localStorage.getItem("leadhit-site-id") !== "5f8475902b0be670555f1bb3"
  //     ) {
  //       router.push({ path: "/" });
  //     }
  //   },

  mounted() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new(this.$refs.chartdiv);
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );
    // Define data
    let data = [
      { date: "2020-07-01", visits: 213 },
      { date: "2020-07-02", visits: 249 },
      { date: "2020-07-03", visits: 179 },
      { date: "2020-07-04", visits: 170 },
      { date: "2020-07-05", visits: 184 },
      { date: "2020-07-06", visits: 202 },
      { date: "2020-07-07", visits: 198 },
      { date: "2020-07-08", visits: 168 },
      { date: "2020-07-09", visits: 176 },
      { date: "2020-07-10", visits: 171 },
      { date: "2020-07-11", visits: 190 },
      { date: "2020-07-12", visits: 154 },
      { date: "2020-07-13", visits: 246 },
      { date: "2020-07-14", visits: 250 },
      { date: "2020-07-15", visits: 227 },
      { date: "2020-07-16", visits: 140 },
      { date: "2020-07-17", visits: 170 },
      { date: "2020-07-18", visits: 125 },
      { date: "2020-07-19", visits: 106 },
      { date: "2020-07-20", visits: 207 },
      { date: "2020-07-21", visits: 222 },
      { date: "2020-07-22", visits: 198 },
      { date: "2020-07-23", visits: 204 },
      { date: "2020-07-24", visits: 213 },
      { date: "2020-07-25", visits: 145 },
      { date: "2020-07-26", visits: 166 },
      { date: "2020-07-27", visits: 163 },
      { date: "2020-07-28", visits: 135 },
      { date: "2020-07-29", visits: 45 },
    ];

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
    });

    var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
    tooltip.label.set("text", "{valueY}");

    let newData = convertData(data);
    series.data.setAll(newData);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
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

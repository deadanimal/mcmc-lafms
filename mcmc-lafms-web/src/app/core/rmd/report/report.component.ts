import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/assets/mock/admin-user/users.model";
import { MocksService } from "src/app/shared/services/mocks/mocks.service";

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, OnDestroy {
  // Chart
  chart: any;
  chart1: any;
  chart2: any;
  chart3: any;
  dataChart: any[] = [];
  dataChart2: any[] = [];
  dataChart3: any[] = [];

  // Datepicker
  bsDPConfig = {
    isAnimated: true,
    containerClass: "theme-default",
  };

  constructor(private mockService: MocksService, private zone: NgZone) {
    this.getData();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chart1) {
        this.chart1.dispose();
      }
      if (this.chart2) {
        this.chart2.dispose();
      }
      if (this.chart3) {
        this.chart3.dispose();
      }
    });
  }

  getData() {
    this.mockService.getAll("admin-report/report-data-1.json").subscribe(
      (res) => {
        // Success
        this.dataChart = res;
      },
      () => {
        // Unsuccess
      },
      () => {
        // After
        this.mockService.getAll("admin-report/report-data-2.json").subscribe(
          (res) => {
            // Success
            this.dataChart2 = res;
          },
          () => {
            // Unsuccess
          },
          () => {
            // After
            this.mockService
              .getAll("admin-report/report-data-3.json")
              .subscribe(
                (res) => {
                  // Success
                  this.dataChart3 = res;
                },
                () => {
                  // Unsuccess
                },
                () => {
                  // After
                  this.getCharts();
                }
              );
          }
        );
      }
    );
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart();
      // this.getChart1();
      this.getChart2();
      this.getChart3();
    });
  }

  getChart() {
    // let chart = am4core.create("chartdiv", am4charts.XYChart);
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: new Date(2018, 3, 20),
        value: 90,
      },
      {
        date: new Date(2018, 3, 21),
        value: 102,
      },
      {
        date: new Date(2018, 3, 22),
        value: 65,
      },
      {
        date: new Date(2018, 3, 23),
        value: 62,
      },
      {
        date: new Date(2018, 3, 24),
        value: 55,
      },
      {
        date: new Date(2018, 3, 25),
        value: 81,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.dateX = "date";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 3;

    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
  }

  // getChart1() {
  //   let chart = am4core.create("chartdiv1", am4charts.XYChart);
  //   chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  //   let data = [];
  //   let open = 100;
  //   let close = 250;

  //   for (var i = 1; i < 120; i++) {
  //     open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
  //     close = Math.round(
  //       open +
  //         Math.random() * 5 +
  //         i / 5 -
  //         (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2
  //     );
  //     data.push({ date: new Date(2018, 0, i), open: open, close: close });
  //   }

  //   chart.data = data;

  //   let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

  //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   valueAxis.tooltip.disabled = true;

  //   let series = chart.series.push(new am4charts.LineSeries());
  //   series.dataFields.dateX = "date";
  //   series.dataFields.openValueY = "open";
  //   series.dataFields.valueY = "close";
  //   series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
  //   series.sequencedInterpolation = true;
  //   series.fillOpacity = 0.3;
  //   series.defaultState.transitionDuration = 1000;
  //   series.tensionX = 0.8;

  //   let series2 = chart.series.push(new am4charts.LineSeries());
  //   series2.dataFields.dateX = "date";
  //   series2.dataFields.valueY = "open";
  //   series2.sequencedInterpolation = true;
  //   series2.defaultState.transitionDuration = 1500;
  //   series2.stroke = chart.colors.getIndex(6);
  //   series2.tensionX = 0.8;

  //   chart.cursor = new am4charts.XYCursor();
  //   chart.cursor.xAxis = dateAxis;
  //   chart.scrollbarX = new am4core.Scrollbar();

  //   this.chart1 = chart;
  // }

  getChart2() {
    // let chart = am4core.create("chartdiv2", am4charts.XYChart);
    let chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Jan",
        first: 40,
        second: 55,
        third: 60,
      },
      {
        category: "Feb",
        first: 30,
        second: 78,
        third: 69,
      },
      {
        category: "Mar",
        first: 27,
        second: 40,
        third: 45,
      },
      {
        category: "Apr",
        first: 50,
        second: 33,
        third: 22,
      },
    ];

    createSeries("first", "Application");
    createSeries("second", "Survey");
    createSeries("third", "Complaint");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }

  getChart3() {
    // let chart = am4core.create("chartdiv3", am4charts.XYChart);
    let chart = am4core.create("chartdiv3", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "MyCC Application",
        value: 260,
      },
      {
        country: "MSC Application",
        value: 230,
      },
      {
        country: "Complaint",
        value: 200,
      },
      {
        country: "Survey",
        value: 165,
      },
    ];

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;

    chart.legend = new am4charts.Legend();
  }
}

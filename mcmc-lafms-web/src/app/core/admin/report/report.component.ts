import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/app/shared/services/users/users.model";
import { UsersService } from "src/app/shared/services/users/users.service";
// import { AuditData } from 'src/assets/mock/admin-Audit/Audit.data.json'
import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

//
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { Router, ActivatedRoute } from "@angular/router";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, OnDestroy {
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: User[] = [];
  SelectionType = SelectionType;

  // Chart
  private chart: any;
  chartJan: number = 0;
  chartFeb: number = 0;
  chartMar: number = 0;
  chartApr: number = 0;
  chartMay: number = 0;
  chartJun: number = 0;
  chartJul: number = 0;
  chartAug: number = 0;
  chartSep: number = 0;
  chartOct: number = 0;
  chartNov: number = 0;
  chartDec: number = 0;

  // Data
  public datas: any = [];
  listuser: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAuditTrailForm: FormGroup;
  editAuditTrailForm: FormGroup;
  editAuditFormMessages = {
    username: [
      // { type: "required", message: "Email is required" },
      { type: "required", message: "A valid email is required" },
    ],
    active: [{ type: "required", message: "Name is required" }],
    enable: [{ type: "required", message: "Name is required" }],
  };

  json;

  constructor(
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private UserData: UsersService,
    private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCharts();
    this.UserData.getAll().subscribe((res) => {
      this.listuser = res;
      this.tableRows = [...res];
      console.log(this.listuser);
      this.listuser = this.tableRows.map((prop, key) => {
        // console.log("test =>", prop, key);
        return {
          ...prop,
          // id: key,
        };
      });
      // console.log("Svc: ", this.listuser);
    });

    this.addAuditTrailForm = this.formBuilder.group({
      scheme_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      scheme_detail: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.editAuditTrailForm = this.formBuilder.group({
      id: new FormControl(""),
      scheme_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      scheme_detail: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  addAuditTrail() {
    // console.log("qqqq");
    // this.loadingBar.start();
    // this.loadingBar.complete();
    this.successMessage();
    console.log(this.addAuditTrailForm.value);
    this.UserData.create(this.addAuditTrailForm.value).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
      },
      () => {
        // Failed
        // this.isLoading = false
        // this.successMessage();
      },
      () => {
        // After
        // this.notifyService.openToastr("Success", "Welcome back");
        // this.navigateHomePage();
      }
    );
  }

  editAuditTrail() {
    // console.log("qqqq");
    // this.loadingBar.start();
    // this.loadingBar.complete();
    this.successEditMessage();
    console.log(this.editAuditTrailForm.value);
    this.UserData.update(
      this.editAuditTrailForm.value.id,
      this.editAuditTrailForm.value
    ).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
      },
      () => {
        // Failed
        // this.isLoading = false
        // this.successMessage();
      },
      () => {
        // After
        // this.notifyService.openToastr("Success", "Welcome back");
        // this.navigateHomePage();
      }
    );
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin//utility/user") {
      return this.router.navigate([path]);
    } else if (path == "/admin//utility/user-detail") {
      return this.router.navigate([path, id]);
    }
  }

  getUser(id: string): User[] {
    return this.listuser.find((e) => e.id === id);
  }

  successMessage() {
    let title = "Success";
    let message = "Create New Scheme Personnel";
    this.notifyService.openToastr(title, message);
  }

  successEditMessage() {
    let title = "Success";
    let message = "Edit Scheme Personnel";
    this.notifyService.openToastr(title, message);
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    var returnData: any;
    let val = $event.target.value;
    this.listuser = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
        // console.log(key, d[key].toLowerCase().toLowerCase().indexOf(val));

        // if (d.username.toLowerCase().indexOf(val) !== -1 || !val) {
        //   returnData = d.username.toLowerCase().indexOf(val) !== -1 || !val;
        // }
        // return returnData;
      }
      return false;
    });
  }

  // filterTable2() {
  //   var returnData: any;
  //   // console.log($event.target.value);
  //   let val_id = this.searchField.value.id;
  //   let val_active = this.searchField.value.active;
  //   console.log(val_id, val_active);
  //   this.listuser = this.tableRows.filter((d) => d.id == val_id);
  // }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
      // if (this.chart1) {
      //   console.log("Chart disposed");
      //   this.chart1.dispose();
      // }
    });
  }

  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editAuditTrailForm.patchValue(row);
    }
    // this.modal = this.modalService.show(
    //   modalRef,
    //   Object.assign({}, { class: "gray modal-xl" })
    // );
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editAuditTrailForm.reset();
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to create this new user?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.register();
        }
      });
  }

  genReport() {
    swal.fire({
      title: "Success",
      text: "Generate Report!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }

  register() {
    swal
      .fire({
        title: "Success",
        text: "A new user has been created!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.editAuditTrailForm.reset();
        }
      });
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
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    // let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Enable chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    // Enable scrollbar
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        date: "2012-01-01",
        value: 8,
      },
      {
        date: "2012-01-02",
        value: 10,
      },
      {
        date: "2012-01-03",
        value: 12,
      },
      {
        date: "2012-01-04",
        value: 14,
      },
      {
        date: "2012-01-05",
        value: 11,
      },
      {
        date: "2012-01-06",
        value: 6,
      },
      {
        date: "2012-01-07",
        value: 7,
      },
      {
        date: "2012-01-08",
        value: 9,
      },
      {
        date: "2012-01-09",
        value: 13,
      },
      {
        date: "2012-01-10",
        value: 15,
      },
      {
        date: "2012-01-11",
        value: 19,
      },
      {
        date: "2012-01-12",
        value: 21,
      },
      {
        date: "2012-01-13",
        value: 22,
      },
      {
        date: "2012-01-14",
        value: 20,
      },
      {
        date: "2012-01-15",
        value: 18,
      },
      {
        date: "2012-01-16",
        value: 14,
      },
      {
        date: "2012-01-17",
        value: 16,
        opacity: 0,
      },
      {
        date: "2012-01-18",
        value: 18,
      },
      {
        date: "2012-01-19",
        value: 17,
      },
      {
        date: "2012-01-20",
        value: 15,
      },
      {
        date: "2012-01-21",
        value: 12,
      },
      {
        date: "2012-01-22",
        value: 10,
      },
      {
        date: "2012-01-23",
        value: 8,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    // series.strokeDasharray = 3;
    series.strokeWidth = 2;
    series.strokeOpacity = 0.3;
    series.strokeDasharray = "3,3";

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color("#fff");
    bullet.setStateOnChildren = true;
    bullet.propertyFields.fillOpacity = "opacity";
    bullet.propertyFields.strokeOpacity = "opacity";

    let hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 1.7;

    function createTrendLine(data) {
      let trend = chart.series.push(new am4charts.LineSeries());
      trend.dataFields.valueY = "value";
      trend.dataFields.dateX = "date";
      trend.strokeWidth = 2;
      trend.stroke = trend.fill = am4core.color("#c00");
      trend.data = data;

      let bullet = trend.bullets.push(new am4charts.CircleBullet());
      bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
      bullet.strokeWidth = 2;
      bullet.stroke = am4core.color("#fff");
      bullet.circle.fill = trend.stroke;

      let hoverState = bullet.states.create("hover");
      hoverState.properties.scale = 1.7;

      return trend;
    }

    createTrendLine([
      { date: "2012-01-02", value: 10 },
      { date: "2012-01-11", value: 19 },
    ]);

    let lastTrend = createTrendLine([
      { date: "2012-01-17", value: 16 },
      { date: "2012-01-22", value: 10 },
    ]);

    // Initial zoom once chart is ready
    // lastTrend.events.once("datavalidated", function () {
    //   series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
    // });
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

    createSeries("first", "Approved");
    createSeries("second", "Rejected");
    createSeries("third", "Completed");

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
        country: "Approved",
        value: 260,
      },
      {
        country: "Completed",
        value: 230,
      },
      {
        country: "New",
        value: 200,
      },
      {
        country: "Rejected",
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

import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";

// get user service
import { User } from "src/app/shared/services/users/users.model";
import { UsersService } from "src/app/shared/services/users/users.service";

// get ticket service
import { License } from "src/app/shared/services/license/license.model";
import { LicenseService } from "src/app/shared/services/license/license.service";

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
  selector: "app-license-management",
  templateUrl: "./license-management.component.html",
  styleUrls: ["./license-management.component.scss"],
})
export class LicenseManagementComponent implements OnInit, OnDestroy {
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: License[] = [];
  SelectionType = SelectionType;

  // Chart
  private chart: any;

  // Data
  public datas: any = [];
  listLicense: any;
  listUser: any;
  ticket_post: any;
  task_2: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addNewLicenseForm: FormGroup;
  editLicenseForm: FormGroup;

  json;

  constructor(
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private LicenseData: LicenseService,
    private UserData: UsersService,
    private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCharts();

    // this.UserData.getAll().subscribe((res) => {
    //   this.listUser = res;
    //   console.log("qweqwe ", res);
    // });

    this.editLicenseForm = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      nric: new FormControl(""),
      mobile_number: new FormControl(""),
      address: new FormControl(""),
      general_description: new FormControl(""),
      signature: new FormControl(""),
      office_number: new FormControl(""),
      fax: new FormControl(""),
      created_date: new FormControl(""),
      modified_date: new FormControl(""),
      company_status: new FormControl(""),
      company_name: new FormControl(""),
      application_status: new FormControl(""),
      reg_date: new FormControl(""),
      count_no: new FormControl(""),
      licence_type: new FormControl(""),
      licence_details_type: new FormControl(""),
      note: new FormControl(""),
      // document1: new FormControl(""),
    });
  }

  ngAfterViewInit(): void {
    this.LicenseData.getAll().subscribe((res) => {
      this.listLicense = res;
      this.tableRows = [...res];

      console.log("data = ", this.listLicense);
      // this.listLicense = this.tableRows.map((proßp, key) => {
      //   // console.log("test =>", prop, key);
      //   return {
      //     ...prop,
      //     // id: key,
      //   };
      // });
      console.log("Svc: ", this.tableRows);
    });
  }

  editLicenseDetail() {
    // console.log("qqqq");
    this.loadingBar.start();
    // this.loadingBar.complete();
    // this.successEditMessage();
    if(this.editLicenseForm.value.count_no == '1'){
      this.editLicenseForm.value.count_no = '2';
    } else if (this.editLicenseForm.value.count_no == '2'){
      this.editLicenseForm.value.count_no = '3';
    } else if (this.editLicenseForm.value.count_no == '3'){
      this.editLicenseForm.value.count_no = '4';
    } else if (this.editLicenseForm.value.count_no == '4'){
      this.editLicenseForm.value.count_no = '5';
    } 
    console.log("wwww", this.editLicenseForm.value);
    this.LicenseData.update(
      this.editLicenseForm.value.id,
      this.editLicenseForm.value
    ).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
        this.loadingBar.complete();
        this.successAlert("update license");
        window.location.reload();
      },
      () => {
        // Failed
        // this.isLoading = false
        // this.successMessage();
        this.errorAlert("edit");
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
    if (path == "/admin//utility/License") {
      return this.router.navigate([path]);
    } else if (path == "/admin//utility/License-detail") {
      return this.router.navigate([path, id]);
    }
  }

  getLicense(id: string): License[] {
    return this.listLicense.find((e) => e.id === id);
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

  errorAlert(task) {
    swal.fire({
      title: "Error",
      text: "Cannot " + task + " License, Please Try Again!",
      type: "error",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Close",
    });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task,
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    var returnData: any;
    let val = $event.target.value;
    this.listLicense = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
        // console.log(key, d[key].toLowerCase().toLowerCase().indexOf(val));

        // if (d.License_type.toLowerCase().indexOf(val) !== -1 || !val) {
        //   returnData =
        //     d.License_type.toLowerCase().indexOf(val) !== -1 || !val;
        // }
        // return returnData;
      }
      return false;
    });
  }

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

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart();
    });
  }

  openModalsm(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editLicenseForm.patchValue({
        ...row,
      });
      console.log(this.editLicenseForm.value);
    }
    // this.modal = this.modalService.show(
    //   modalRef,
    //   Object.assign({}, { class: "gray modal-lg" })
    // );
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }
  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editLicenseForm.patchValue({
        ...row,
      });
      console.log(this.editLicenseForm.value);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editLicenseForm.reset();
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to create this new License?",
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

  register() {
    swal
      .fire({
        title: "Success",
        text: "A new License has been created!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.editLicenseForm.reset();
        }
      });
  }

  getChart() {
    // let chart = am4core.create("chartdivLicense", am4charts.XYChart);
    // let chart = am4core.create("chartdivLicense", am4charts.XYChart);
    let chart = am4core.create("chartdivLicense", am4charts.XYChart);

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
    lastTrend.events.once("datavalidated", function () {
      // series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
    });
  }
}

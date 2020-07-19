import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/app/shared/services/users/users.model";
import { UsersService } from "src/app/shared/services/users/users.service";
// import { AuditData } from 'src/assets/mock/admin-audit/audit.data.json'
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
  selector: "app-management-user",
  templateUrl: "./management-user.component.html",
  styleUrls: ["./management-user.component.scss"],
})
export class ManagementUserComponent implements OnInit, OnDestroy {
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
  editUserForm: FormGroup;
  searchForm: FormGroup;
  searchField: FormGroup;
  focusUsername;
  focusPassword;
  focusConfirmPassword;
  registerForm: FormGroup;
  registerFormMessages = {
    username: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "Please enter a valid email" },
    ],
    password1: [
      { type: "required", message: "Password is required" },
      {
        type: "minLength",
        message: "Password must have at least 8 characters",
      },
    ],
    password2: [
      { type: "required", message: "Password is required" },
      {
        type: "minLength",
        message: "Password must have at least 8 characters",
      },
    ],
  };

  editUserFormMessages = {
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

    this.registerForm = this.formBuilder.group({
      username: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password1: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
      password2: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });

    this.editUserForm = this.formBuilder.group({
      id: new FormControl(""),
      username: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      active: new FormControl("", Validators.compose([Validators.required])),
      enabled: new FormControl("", Validators.compose([Validators.required])),
      billing_address: new FormControl(""),
    });

    this.searchForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      // active: new FormControl("", Validators.compose([Validators.required])),
    });
    this.searchField = this.formBuilder.group({
      id: new FormControl("", Validators.compose([Validators.required])),
      active: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  registerNewUser() {
    console.log("qqqq");
    this.loadingBar.start();
    this.loadingBar.complete();
    this.successMessage();
    console.log(this.registerForm.value);
    this.UserData.create(this.registerForm.value).subscribe(
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

  updateUser() {
    // console.log("qqqq");
    // this.loadingBar.start();
    // this.loadingBar.complete();
    this.successEditMessage();
    console.log(this.editUserForm.value);
    this.UserData.update(
      this.editUserForm.value.id,
      this.editUserForm.value
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

  searchOne() {
    // console.log("qqqq");
    // this.loadingBar.start();
    // this.loadingBar.complete();
    // this.successMessage();
    console.log(this.searchForm.value.username);
    this.UserData.getOne(this.searchForm.value.username).subscribe(
      (res) => {
        // Success
        this.listuser = res;
        console.log("search Respon =", res);
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

  searchColumnField() {
    // console.log("qqqq");
    // this.loadingBar.start();
    // this.loadingBar.complete();
    // this.successMessage();
    console.log("form ->", this.searchField.value);
    this.UserData.filter(this.searchField.value).subscribe(
      (res) => {
        // Success
        this.listuser = res;
        console.log("search Respon =", res);
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
    let message = "Create New User";
    this.notifyService.openToastr(title, message);
  }

  successEditMessage() {
    let title = "Success";
    let message = "Edit New User";
    this.notifyService.openToastr(title, message);
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  // handleChange = event => {
  //   const lowercasedFilter = this.state.SearchResult.toLowerCase();
  //   const result = this.state.data.bank_accounts.filter(item => {
  //      return Object.keys(item).some(
  //        key => typeof item[key] === "string"
  //        && item[key].toLowerCase().includes(lowercasedFilter) );
  //   });
  //   this.setState({ SearchResult: event.target.value });
  // };
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

  // getChart() {
  //   let chart = am4core.create("chartdiv", am4charts.XYChart);

  //   // Add data
  //   chart.data = [
  //     {
  //       month: "Jan",
  //       count: this.chartJan,
  //     },
  //     {
  //       month: "Feb",
  //       count: this.chartFeb,
  //     },
  //     {
  //       month: "Mar",
  //       count: this.chartMar,
  //     },
  //     {
  //       month: "Apr",
  //       count: this.chartApr,
  //     },
  //     {
  //       month: "May",
  //       count: this.chartMar,
  //     },
  //     {
  //       month: "Jun",
  //       count: this.chartJun,
  //     },
  //     {
  //       month: "Jul",
  //       count: this.chartJul,
  //     },
  //     {
  //       month: "Aug",
  //       count: this.chartAug,
  //     },
  //     {
  //       month: "Sep",
  //       count: this.chartSep,
  //     },
  //     {
  //       month: "Oct",
  //       count: this.chartOct,
  //     },
  //     {
  //       month: "Nov",
  //       count: this.chartNov,
  //     },
  //     {
  //       month: "Dec",
  //       count: this.chartDec,
  //     },
  //   ];

  //   // Create axes

  //   let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  //   categoryAxis.dataFields.category = "month";
  //   categoryAxis.renderer.grid.template.location = 0;
  //   categoryAxis.renderer.minGridDistance = 30;

  //   categoryAxis.renderer.labels.template.adapter.add("dy", function (
  //     dy,
  //     target
  //   ) {
  //     if (target.dataItem && target.dataItem.index && 2 == 2) {
  //       return dy + 25;
  //     }
  //     return dy;
  //   });

  //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  //   // Create series
  //   let series = chart.series.push(new am4charts.ColumnSeries());
  //   series.dataFields.valueY = "count";
  //   series.dataFields.categoryX = "month";
  //   series.name = "count";
  //   series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  //   series.columns.template.fillOpacity = 0.8;

  //   let columnTemplate = series.columns.template;
  //   columnTemplate.strokeWidth = 2;
  //   columnTemplate.strokeOpacity = 1;

  //   this.chart = chart;
  // }

  // calculateCharts() {
  //   this.chartJan = 0;
  //   this.chartFeb = 0;
  //   this.chartMar = 0;
  //   this.chartApr = 0;
  //   this.chartMay = 0;
  //   this.chartJun = 0;
  //   this.chartJul = 0;
  //   this.chartAug = 0;
  //   this.chartSep = 0;
  //   this.chartOct = 0;
  //   this.chartNov = 0;
  //   this.chartDec = 0;
  //   this.tableRows.forEach((row) => {
  //     let checkerDate = moment(row.joined_at);
  //     let checkerDateMonth = checkerDate.month();
  //     if (checkerDateMonth == 0) {
  //       this.chartJan += 1;
  //     } else if (checkerDateMonth == 1) {
  //       this.chartFeb += 1;
  //     } else if (checkerDateMonth == 2) {
  //       this.chartMar += 1;
  //     } else if (checkerDateMonth == 3) {
  //       this.chartApr += 1;
  //     } else if (checkerDateMonth == 4) {
  //       this.chartMay += 1;
  //     } else if (checkerDateMonth == 5) {
  //       this.chartJun += 1;
  //     } else if (checkerDateMonth == 6) {
  //       this.chartJul += 1;
  //     } else if (checkerDateMonth == 7) {
  //       this.chartAug += 1;
  //     } else if (checkerDateMonth == 8) {
  //       this.chartSep += 1;
  //     } else if (checkerDateMonth == 9) {
  //       this.chartOct += 1;
  //     } else if (checkerDateMonth == 10) {
  //       this.chartNov += 1;
  //     } else if (checkerDateMonth == 11) {
  //       this.chartDec += 1;
  //     }
  //   });
  // }

  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editUserForm.patchValue(row);
    }
    // this.modal = this.modalService.show(
    //   modalRef,
    //   Object.assign({}, { class: "gray modal-xl" })
    // );
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
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
          this.registerForm.reset();
        }
      });
  }

  getChart() {
    let chart = am4core.create("chartdivuser", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        year: "Jan",
        active: 1,
        inactive: 5,
        pending: 3,
      },
      {
        year: "Feb",
        active: 3,
        inactive: 2,
        pending: 2,
      },
      {
        year: "Mar",
        active: 5,
        inactive: 4,
        pending: 3,
      },
      {
        year: "Apr",
        active: 3,
        inactive: 3,
        pending: 5,
      },
      {
        year: "May",
        active: 6,
        inactive: 5,
        pending: 4,
      },
      {
        year: "Jun",
        active: 2,
        inactive: 4,
        pending: 3,
      },
      {
        year: "Jul",
        active: 4,
        inactive: 3,
        pending: 4,
      },
      {
        year: "Aug",
        active: 5,
        inactive: 4,
        pending: 6,
      },
    ];
    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    // categoryAxis.renderer.opposite = true;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inversed = true;
    valueAxis.title.text = "Value";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "active";
    series1.dataFields.categoryX = "year";
    series1.name = "Active";
    series1.strokeWidth = 3;
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "inactive";
    series2.dataFields.categoryX = "year";
    series2.name = "Inactive";
    series2.strokeWidth = 3;
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "pending";
    series3.dataFields.categoryX = "year";
    series3.name = "Pending";
    series3.strokeWidth = 3;
    series3.bullets.push(new am4charts.CircleBullet());
    series3.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series3.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    // Add legend
    chart.legend = new am4charts.Legend();
  }
}

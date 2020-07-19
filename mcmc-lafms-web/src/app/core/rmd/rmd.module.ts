import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { RouterModule } from "@angular/router";
import { RmdRoutes } from "./rmd.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { LicenseManagementComponent } from "./license-management/license-management.component";
import { OrganisationsComponent } from "./organisations/organisations.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { RevenueManagementComponent } from "./revenue-management/revenue-management.component";
import { RolloutBlockingIssuesComponent } from "./rollout-blocking-issues/rollout-blocking-issues.component";
import { RolloutProjectManagementComponent } from "./rollout-project-management/rollout-project-management.component";
import { RolloutPunchlistManagementComponent } from "./rollout-punchlist-management/rollout-punchlist-management.component";
import { RolloutTroubleTicketManagementComponent } from "./rollout-trouble-ticket-management/rollout-trouble-ticket-management.component";

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementUserComponent,
    LicenseManagementComponent,
    ReportComponent,
    OrganisationsComponent,
    TicketsComponent,
    RevenueManagementComponent,
    RolloutBlockingIssuesComponent,
    RolloutProjectManagementComponent,
    RolloutPunchlistManagementComponent,
    RolloutTroubleTicketManagementComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(RmdRoutes),
  ],
})
export class RmdModule {}

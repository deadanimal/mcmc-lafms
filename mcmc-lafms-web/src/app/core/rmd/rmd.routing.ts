import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { string } from "@amcharts/amcharts4/core";
import { ReportComponent } from "./report/report.component";
import { OrganisationsComponent } from "./organisations/organisations.component";
import { RevenueManagementComponent } from "./revenue-management/revenue-management.component";
import { AuditTrailComponent } from "./audit-trail/audit-trail.component";
import { LicenseManagementComponent } from "./license-management/license-management.component";
import { RolloutBlockingIssuesComponent } from "./rollout-blocking-issues/rollout-blocking-issues.component";
import { RolloutProjectManagementComponent } from "./rollout-project-management/rollout-project-management.component";
import { RolloutPunchlistManagementComponent } from "./rollout-punchlist-management/rollout-punchlist-management.component";
import { RolloutTroubleTicketManagementComponent } from "./rollout-trouble-ticket-management/rollout-trouble-ticket-management.component";

export const RmdRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "license",
        component: LicenseManagementComponent,
      },
      {
        path: "rollout",
        children: [
          {
            path: "blocking-issues",
            component: RolloutBlockingIssuesComponent,
          },
          {
            path: "project-management",
            component: RolloutProjectManagementComponent,
          },
          {
            path: "punchlist-management",
            component: RolloutPunchlistManagementComponent,
          },
          {
            path: "trouble-ticket-management",
            component: RolloutTroubleTicketManagementComponent,
          },
        ],
      },
      {
        path: "organisations",
        component: OrganisationsComponent,
      },
      {
        path: "revenue",
        component: RevenueManagementComponent,
      },
      {
        path: "report",
        component: ReportComponent,
      },
      {
        path: "audit-trail",
        component: AuditTrailComponent,
      },
      {
        path: "users",
        // children: [
        //   {
        //     path: "user",
        component: ManagementUserComponent,
        // },
        // ],
      },
    ],
  },
];

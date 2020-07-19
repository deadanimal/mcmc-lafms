import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LicenseComponent } from "./license/license.component";
import { Complaint } from "src/app/shared/services/complaints/complaints.model";

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "license",
        component: LicenseComponent,
      },
    ],
  },
];

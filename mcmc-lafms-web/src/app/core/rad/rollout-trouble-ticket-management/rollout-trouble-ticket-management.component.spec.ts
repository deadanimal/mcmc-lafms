import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolloutTroubleTicketManagementComponent } from "./rollout-trouble-ticket-management.component";

describe("RolloutTroubleTicketManagementComponent", () => {
  let component: RolloutTroubleTicketManagementComponent;
  let fixture: ComponentFixture<RolloutTroubleTicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolloutTroubleTicketManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloutTroubleTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

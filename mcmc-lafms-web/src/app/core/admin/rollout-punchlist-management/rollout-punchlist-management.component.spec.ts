import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolloutPunchlistManagementComponent } from "./rollout-punchlist-management.component";

describe("RolloutPunchlistManagementComponent", () => {
  let component: RolloutPunchlistManagementComponent;
  let fixture: ComponentFixture<RolloutPunchlistManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolloutPunchlistManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloutPunchlistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

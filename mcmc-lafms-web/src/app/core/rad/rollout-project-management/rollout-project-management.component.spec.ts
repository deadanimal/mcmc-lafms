import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolloutProjectManagementComponent } from "./rollout-project-management.component";

describe("RolloutProjectManagementComponent", () => {
  let component: RolloutProjectManagementComponent;
  let fixture: ComponentFixture<RolloutProjectManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolloutProjectManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloutProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

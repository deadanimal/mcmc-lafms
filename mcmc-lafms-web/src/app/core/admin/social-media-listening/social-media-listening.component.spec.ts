import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaListeningComponent } from './social-media-listening.component';

describe('SocialMediaListeningComponent', () => {
  let component: SocialMediaListeningComponent;
  let fixture: ComponentFixture<SocialMediaListeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaListeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

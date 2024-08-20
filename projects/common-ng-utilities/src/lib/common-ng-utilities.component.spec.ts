import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOsUtilitiesComponent } from './common-ng-utilities.component';

describe('CommonNgUtilitiesComponent', () => {
  let component: PeopleOsUtilitiesComponent;
  let fixture: ComponentFixture<PeopleOsUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleOsUtilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleOsUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

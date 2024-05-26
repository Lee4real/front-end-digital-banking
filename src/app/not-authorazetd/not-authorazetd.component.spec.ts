import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorazetdComponent } from './not-authorazetd.component';

describe('NotAuthorazetdComponent', () => {
  let component: NotAuthorazetdComponent;
  let fixture: ComponentFixture<NotAuthorazetdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAuthorazetdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAuthorazetdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

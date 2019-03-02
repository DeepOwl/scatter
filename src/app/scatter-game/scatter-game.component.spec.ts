import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterGameComponent } from './scatter-game.component';

describe('ScatterGameComponent', () => {
  let component: ScatterGameComponent;
  let fixture: ComponentFixture<ScatterGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

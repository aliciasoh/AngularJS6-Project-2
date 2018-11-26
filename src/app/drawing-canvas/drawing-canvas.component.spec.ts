import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCanvasComponent } from './drawing-canvas.component';

describe('DrawingCanvasComponent', () => {
  let component: DrawingCanvasComponent;
  let fixture: ComponentFixture<DrawingCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render canvas text', async(() => {
    const fixture = TestBed.createComponent(DrawingCanvasComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.drawing-canvas-container').textContent).toContain('Canvas');
  }));

});

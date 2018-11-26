import { TestBed, ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';

import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InstructionsComponent,
        InputFieldComponent,
        DrawingCanvasComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Drawing Canvas'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Drawing Canvas');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Drawing Canvas!');
  }));
  it('on Q, it will quit and restart the canvas', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let input = fixture.debugElement.query(By.css('#input-data'));
    input.nativeElement.value = "Q";
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    tick();

    const canvasFixture = TestBed.createComponent(InputFieldComponent);
    const canvasAttr = canvasFixture.debugElement.componentInstance;
    expect(canvasAttr.blobSize).toEqual(0);
  }));
});

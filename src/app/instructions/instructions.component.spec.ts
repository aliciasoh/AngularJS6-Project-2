import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsComponent } from './instructions.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('InstructionsComponent', () => {
  let component: InstructionsComponent;
  let fixture: ComponentFixture<InstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', async(() => {
    const fixture = TestBed.createComponent(InstructionsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table').textContent).toContain('Command');
  }));

  it('should render header row', async(() => {
    const fixture = TestBed.createComponent(InstructionsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table').textContent).toContain('Description');
  }));

  it('should render contents', async(() => {
    const fixture = TestBed.createComponent(InstructionsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table').textContent).toContain('Should fill the entire area connected to (x,y) with "colour" c. The behaviour of this is the same as that of the "bucket fill" tool in paint programs.');
  }));
  
});

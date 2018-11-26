import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;
  let input: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#input-data'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input', async(() => {
    const fixture = TestBed.createComponent(InputFieldComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent);
  }));

  it('should render submit button', async(() => {
    const fixture = TestBed.createComponent(InputFieldComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Submit');
  }));

  it('should call checkInput method on clicking submit', () => {
    const checkInput = spyOn(component, 'checkInput');
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(checkInput).toHaveBeenCalled();
  });
  it('on invalid input, it will render error message', async(() => {
    const fixture = TestBed.createComponent(InputFieldComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    input.nativeElement.value = "testing";
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(compiled.querySelector('#error-message').textContent).toContain('Please enter C x y, where x and y are <= 500 and > 0.');
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourse } from './add-course';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('AddCourse', () => {
  
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    });
    fb = TestBed.inject(FormBuilder);
  });

  fit('Debería crear el formulario de los cursos con valores iniciales', () => {
    const form = fb.group({
      id: [0, [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    expect(form.value).toEqual({
      id: 0,
      title: '',
      description: ''
    });

    expect(form.valid).toBeFalse(); 
  });

  fit('Debería ser validar que  todos los campos tengan valores', () => {
    const form = fb.group({
      id: [0, [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    form.setValue({
      id: 1,
      title: 'Angular',
      description: 'Curso Angular'
    });

    expect(form.valid).toBeTrue();
  });

  fit('Debería marcar "title" como inválido si está vacío', () => {
    const form = fb.group({
      id: [1, [Validators.required]],
      title: ['', Validators.required],
      description: ['algo', Validators.required]
    });

    const titleControl = form.get('title');
    expect(titleControl?.valid).toBeFalse();
    expect(titleControl?.errors?.['required']).toBeTrue();
  });
});

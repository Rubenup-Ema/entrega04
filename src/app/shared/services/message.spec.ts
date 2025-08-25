import { TestBed } from '@angular/core/testing';

import { Message } from './message';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('Message', () => {
  let service: Message;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        Message,
        { provide: MatSnackBar, useValue: spy }
      ]
    });

    service = TestBed.inject(Message);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  fit('abre snackbar con el texto y opciones correctas', () => {
    service.show('Proceso completado!!!');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Proceso completado!!! ✅',
      'Cerrar',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    );
  });
});
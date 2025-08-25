import { TestBed } from '@angular/core/testing';
import { FullnamePipe } from './fullname-pipe';

describe('FullnamePipe', () => {


  it('create an instance', () => {
    const pipe = new FullnamePipe();
    expect(pipe).toBeTruthy();
  });

   fit('deberia retornar titulo incorrecto', ()=> {

    const fixture = new FullnamePipe;

    const titulo = fixture.transform('titulo', 'incorrecto');

    expect(titulo).toBe('titulo incorrecto');

  });

});




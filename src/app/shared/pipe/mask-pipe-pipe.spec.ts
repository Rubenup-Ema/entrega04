import { MaskPipe } from './mask-pipe-pipe';

describe('MaskPipe', () => {
  it('create an instance', () => {
    const pipe = new MaskPipe();
    expect(pipe).toBeTruthy();
  });

  fit('deberia retornar ********', ()=> {
  
      const fixture = new MaskPipe;
  
      const titulo = fixture.transform('password');
  
      expect(titulo).toBe('********');
  
    });

});



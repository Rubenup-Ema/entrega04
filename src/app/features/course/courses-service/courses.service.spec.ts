import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Course } from '../../../shared/entities/entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  //Data para POST
  const newCourse: Course  = {id: 0, title: 'Turbo Pascal', description: 'Lo mejor del MSDOS programación avanzada' };
  
  //Data para PUT
  const updateData: Course = { id: 2, title: 'Fox Pro 6.0', description: 'Curso avanzado de FP' };
  const updatedCourse: Course = { id: 2, title: 'Fox Pro 6.0', description: 'Curso avanzado de FP para' };
  
  //Data para DELETE
  const deletedCourse: Course = { id: 1, title: 'Visual Basic 6.0', description: 'Primeros pasos en vb6' };

  //Data para GET
 const mockUsers: Course[] = [
    { id: 1, title: 'Visual Basic 6.0', description: 'Primeros pasos en vb6' },
    { id: 2, title: 'Fox Pro 6.0', description: 'Curso avanzado de FP' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  //Obtengo los datos de Courses

   fit('Debería GET courses', () => {
    service.loadCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service['url'] + '/course');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // simula respuesta del backend
  });

  //Guardo un Registro del Courses
  fit('Debería CREATE Courses (POST)', () => {
    
    const createdCourse: Course = { ...newCourse };

    service.addCourse(newCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    const req = httpMock.expectOne(service['url']+ '/course');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(createdCourse);
  });

//Modific0 un Registro del Course
  fit('Debería UPDATE Courses (PUT)', () => {
   
    service.editCourse(updateData).subscribe(course => {
      expect(course).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne(`${service['url']}/course/2`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCourse);
  });

  //Elimino un registro del Course
    fit('Debería DELETE Courses (DELETE)', () => {
    const courseId = 1;
    

    service.deleteCourse(courseId).subscribe(course => {
      expect(course).toEqual(deletedCourse);
    });

    // interceptamos el request
    const req = httpMock.expectOne(`${(service as any).url}/course/${courseId}`);
    expect(req.request.method).toBe('DELETE'); 
    req.flush(deletedCourse); 
  });

});

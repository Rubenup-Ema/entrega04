import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVer } from './menu-ver';

describe('MenuVer', () => {
  let component: MenuVer;
  let fixture: ComponentFixture<MenuVer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuVer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

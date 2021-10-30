import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoTabelaComponent } from './requisicao-tabela.component';

describe('RequisicaoTabelaComponent', () => {
  let component: RequisicaoTabelaComponent;
  let fixture: ComponentFixture<RequisicaoTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicaoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

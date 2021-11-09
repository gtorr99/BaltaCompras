import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorTabelaComponent } from './fornecedor-tabela.component';

describe('FornecedorTabelaComponent', () => {
  let component: FornecedorTabelaComponent;
  let fixture: ComponentFixture<FornecedorTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

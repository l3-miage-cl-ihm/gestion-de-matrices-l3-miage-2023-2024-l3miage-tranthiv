import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Matrix, initMatrixIntRandom, addIntMatrixes, multiplyIntMatrixes } from './matrix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// Correction avec des génériques, pour les étufiant, l'utilisation de number est suffisante...
export class AppComponent<L1 extends number, H1 extends number, L2 extends number, H2 extends number> {
  readonly sigL1 = signal<number>(2);
  
  readonly sigH1 = signal<number>(2);
  
  readonly sigL2 = signal<number>(2);
 
  readonly sigH2 = signal<number>(2);
  
  readonly sigM1 = computed(() => initMatrixIntRandom(this.sigL1(), this.sigH1()));
  readonly sigM2 = computed(() => initMatrixIntRandom(this.sigL2(), this.sigH2()));

  changeL1(value: number) {
    this.sigL1.set(value);
  }

  changeH1(value: number) {
    this.sigH1.set(value);
  }

  changeL2(value: number) {
    this.sigL2.set(value);
  }

  changeH2(value: number) {
    this.sigH2.set(value);
  }
  
  readonly sigM1plusM2 = computed<Matrix<number, number, number>>(() => addIntMatrixes(this.sigM1(), this.sigM2()));
  readonly sigM1xM2 = computed<Matrix<number, number, number>>(() => multiplyIntMatrixes(this.sigM1(), this.sigM2()));

  
  


  

}


import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Matrix, initMatrixIntRandom, addIntMatrixes, multiplyIntMatrixes, isMatrixSized } from './matrix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// Correction avec des génériques, pour les étufiant, l'utilisation de number est suffisante...
export class AppComponent<L1 extends number, H1 extends number, L2 extends number, H2 extends number> {
  readonly sigL1 = signal<L1>(2 as L1);
  
  readonly sigH1 = signal<H1>(2 as H1);
  
  readonly sigL2 = signal<L2>(2 as L2);
 
  readonly sigH2 = signal<H2>(2 as H2);
  
  readonly sigM1 = computed(() => {
    const M = initMatrixIntRandom(this.sigL1(), this.sigH1())
    console.log(M)
    return M;
  })
  readonly sigM2 = computed(() => initMatrixIntRandom(this.sigL2(), this.sigH2()));

  
  readonly sigM1plusM2 = computed<undefined | Matrix<number, number, number>>(() => {
    const M2 = this.sigM2();
    if (!isMatrixSized(M2, this.sigL1(), this.sigH1())) return undefined;
    addIntMatrixes(this.sigM1(), M2)
  });

  readonly sigM1xM2 = computed<undefined | Matrix<number, number, number>>(() => {
    const M2 = this.sigM2();
    if (!isMatrixSized(M2, this.sigH1(), this.sigL1())) return undefined;
    return multiplyIntMatrixes(this.sigM1(), M2)
  });

  
  
}


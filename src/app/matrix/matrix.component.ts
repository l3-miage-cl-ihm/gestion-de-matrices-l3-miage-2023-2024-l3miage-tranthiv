import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Matrix, initMatrixIntRandom, getMatrixLine, getMatrixColumn } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixComponent {
  
  @Input({ required: true }) data: Matrix<number, number, number> = initMatrixIntRandom<number, number>(0, 0);
  
  getMatrixLine = getMatrixLine;
  getMatrixColumn = getMatrixColumn;
  

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Matrix, initMatrixIntRandom, getMatrixLine, getMatrixColumn } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class MatrixComponent {
  
  @Input({ required: true }) data!: Matrix<number, number, number>;
  
  getMatrixLine = getMatrixLine;
  getMatrixColumn = getMatrixColumn;
  
  @Input() highlight: Highlight = undefined;
  @Output() pointerOver = new EventEmitter<[number, number] | undefined>();

  highlightLine(line: number) {
    this.highlight = { line };
  }

  highlightColumn(column: number) {
    this.highlight = { column };
  }


  highlightCell(line: number, column: number) {
    this.highlight = { cell: [line, column] };
  }

  pointerOut() {
    this.pointerOver.emit(undefined);
  }

  pointerOverCell(line: number, column: number) {
    this.pointerOver.emit([line, column]);
  }

  
                      
}

export type HighlightLine = {line: number};
export type HighlightColumn = {column: number};
export type HighlightCell = {cell: [line: number, column: number]};
export type Highlight = undefined
                      | HighlightLine
                      | HighlightColumn
                      | HighlightCell;



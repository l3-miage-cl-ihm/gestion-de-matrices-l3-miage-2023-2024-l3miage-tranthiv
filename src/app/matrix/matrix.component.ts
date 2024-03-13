import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Matrix } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatrixComponent {
  

  @Input({ required: true }) data!: Matrix<number,number,number>  | undefined 
  @Input({ required: true}) highlight: Highlight = undefined;

  @Output() pointerOver = new EventEmitter<[line:number,column:number] | undefined>;


  public updatepointer(pe:[line:number,column:number] | undefined){
    this.pointerOver.emit(pe);
  }

  public isHighlited(line:number,column:number) {
    const highlightCell   = this.highlight as HighlightCell;
    const highlightColumn = this.highlight as HighlightColumn;
    const highlightLine = this.highlight as HighlightLine;
    return (( highlightCell.cell && highlightCell.cell[0] === line && highlightCell.cell[1] === column )
        || ( highlightColumn && highlightColumn.column === column )
        || (highlightLine && highlightLine.line === line));
  }

}
export type HighlightLine = {readonly line: number};
export type HighlightColumn = {readonly column: number};
export type HighlightCell = {readonly cell: readonly [line: number, column: number]};
export type Highlight = undefined
                      | HighlightLine
                      | HighlightColumn
                      | HighlightCell;

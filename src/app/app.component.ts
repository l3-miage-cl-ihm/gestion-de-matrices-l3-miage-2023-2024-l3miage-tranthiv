import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { Matrix, initMatrixIntRandom, addIntMatrixes, multiplyIntMatrixes, Vector } from './matrix';
import { Highlight, HighlightCell } from './matrix/matrix.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// Correction avec des génériques, pour les étufiant, l'utilisation de number est suffisante...
export class AppComponent<L1 extends number, H1 extends number, L2 extends number, H2 extends number> {
  // à compléter

  readonly sigL1 = signal<number>(0);
  readonly sigH1 = signal<number>(0);
  readonly sigM1 = computed<Matrix<number,number,number>>(() => initMatrixIntRandom(this.sigL1(),this.sigH1()));

  readonly sigL2 = signal<number>(0);
  readonly sigH2 = signal<number>(0);
  readonly sigM2 = computed<Matrix<number,number,number>>(() => initMatrixIntRandom(this.sigL2(),this.sigH2()));
  readonly eff = effect(() => console.log("sig m1 : ",this.sigM1(),"sig m2 : ",this.sigM2(), "sig m1pM2", this.sigM1plusM2(), "sig M1xM2", this.sigM1xM2(), "\n"));


  

  readonly sigM1plusM2 = computed<Matrix<number,number,number> | undefined> (() => {
    const diffLines = this.sigL1() != this.sigL2()
    const diffCol = this.sigH1() != this.sigH2()
    const M1undef = this.sigL1() == 0 || this.sigH1() == 0
    const M2undef = this.sigL2() == 0 || this.sigH2() == 0
    if(!diffLines && !diffCol && !M1undef && !M2undef){
      console.log("addM1M2")
      console.log(this.sigL1(), this.sigL2(), this.sigH1(), this.sigH2());
      console.log(addIntMatrixes(this.sigM1(),this.sigM2()))
      return addIntMatrixes(this.sigM1(),this.sigM2());
  }
  return undefined;
  })
  readonly sigM1xM2 = computed<Matrix<number,number,number> | undefined> (() => {
    const M1undef = this.sigL1() == 0 || this.sigH1() == 0
    const M2undef = this.sigL2() == 0 || this.sigH2() == 0
    
    if(this.sigH1() != this.sigL2() || this.sigL1() != this.sigH2()){
      console.log(this.sigL1(), this.sigL2(), this.sigH1(), this.sigH2());
      console.log(multiplyIntMatrixes(this.sigM1(),this.sigM2()))
      return undefined
  }
  return multiplyIntMatrixes(this.sigM1(),this.sigM2());
  
  
  })

  readonly sigHhilightInM1 = signal<Highlight>(undefined)
  readonly sigHhilightInM2 = signal<Highlight>(undefined)
  readonly sigHhilightInM1plusM2 = signal<Highlight>(undefined)
  readonly sigHhilightInM1xM2 = signal<Highlight>(undefined)

  public updateL1(n:number):void{
    this.sigL1.set(n);
  }
  public updateH1(n:number):void{
    this.sigH1.set(n);
  }
  public updateL2(n:number):void{
    this.sigL2.set(n);
  }
  public updateH2(n:number):void{
    this.sigH2.set(n);
  }

  overM1plusM2(c?: [line:number,column:number]):void{
    if(c == undefined){
      this.sigHhilightInM1xM2.set(undefined)
      this.sigHhilightInM1.set(undefined);
      this.sigHhilightInM2.set(undefined);
    }
    else{
    this.sigHhilightInM1plusM2.set({cell:c})
    this.sigHhilightInM1.set({cell:c})
    this.sigHhilightInM2.set({cell:c})
    }
  }
  overM1xM2(c?: [line:number,column:number]):void{
    if(c == undefined){
      this.sigHhilightInM1xM2.set(undefined)
      this.sigHhilightInM1.set(undefined);
      this.sigHhilightInM2.set(undefined);
    }
    else{
    this.sigHhilightInM1xM2.set({cell:c})
    this.sigHhilightInM1.set({line:c[0]});
    this.sigHhilightInM2.set({column:c[1]});
    }
  }

}

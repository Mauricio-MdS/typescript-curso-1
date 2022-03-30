import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js"

export class NegociacaoController{
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView : NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView : MensagemView = new MensagemView('#mensagemView');

    constructor(){
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void{
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value);

        if (!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('A data da negociação precisa ser um dia útil');
            return;
        }
      
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limpaFormulario();
        
    }

    private ehDiaUtil(data: Date): boolean{
        return (data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO);
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação criada com sucesso');
    }

    private limpaFormulario(): void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
}
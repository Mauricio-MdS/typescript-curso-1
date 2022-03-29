import { Negociacoes } from "../models/negociacoes.js";

export class NegociacoesView{

    private elemento: HTMLDivElement;

    constructor(seletor: string){
        this.elemento = document.querySelector(seletor);
    }

    private template(model: Negociacoes): string{
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </thead>
            <tbody>
                ${
                    model.lista().map(negociacao => 
                         `
                        <tr>
                            <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>
                        `).join('')
                }
            </tbody>
        </table>
        `
    }

    update(model: Negociacoes): void{
        this.elemento.innerHTML = this.template(model);
    }

}
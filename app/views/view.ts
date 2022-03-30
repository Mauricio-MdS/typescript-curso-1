export abstract class View<T>{

    protected elemento: HTMLElement;
    private escapar: boolean = false;

    constructor(seletor: string, escapar?: boolean){
        const elementoSelecionado = document.querySelector(seletor);
        if (elementoSelecionado){
            this.elemento = elementoSelecionado as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não corresponde à um elemento do DOM.`);
        }
        
    }

    protected abstract template(model: T): string;

    update(model: T): void{
         let template = this.template(model);
         if (this.escapar){
             template = template.replace(/<script>[\s\S]*?<script>/,'');
         }
         this.elemento.innerHTML = template;
    }

}
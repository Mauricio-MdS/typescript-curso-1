export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elementoSelecionado = document.querySelector(seletor);
        if (elementoSelecionado) {
            this.elemento = elementoSelecionado;
        }
        else {
            throw Error(`Seletor ${seletor} não corresponde à um elemento do DOM.`);
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}

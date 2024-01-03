import Element from "./Element.js";

export default class Content extends Element {
    constructor(elementData) {
        super('div');
        this.addClass('content-area');
        this.styles = elementData.more.styles || {};
        this.content = elementData.content || [];
        this.setStyleAttribute();
        if (elementData.more.customClass) {
            this.addClass(elementData.more.customClass);
        }
    }

    async render(indent = 0) {
        const indentation = '\t'.repeat(indent);
        this.addClass(`indent-${indent}`);

        let html = `\n${indentation}<div`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += '>';

        html += this.content;

        html += `\n${indentation}</div>`;
        return html;
    }
}
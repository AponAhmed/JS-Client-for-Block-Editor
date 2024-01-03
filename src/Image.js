import Element from "./Element.js";

export default class Image extends Element {
    constructor(data) {
        super('img');
        this.align = data.align || '';
        this.src = data.src || '';
        this.width = data.width || '';
        this.height = data.height || '';
        this.customClass = data.more.customClass || '';

        this.setAttribute('src', this.src);
        this.setAttribute('width', this.width);
        this.setAttribute('height', this.height);

        this.addClass(`align-${this.align}`);
        this.addClass(this.customClass);
    }

    async render(indent = 0) {
        const indentStr = ' '.repeat(indent);
        let html = `${indentStr}<${this.type}`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += '>';

        return html;
    }
}
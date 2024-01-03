import Element from "./Element.js";

export default class TextElement extends Element {
    constructor(type, content) {
        super(type);
        this.content = content;
    }

    async render(indent = 0) {
        const indentation = '\t'.repeat(indent);
        const tag = this.type.toLowerCase();
        let html = `\n${indentation}<${tag}`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += `>${this.content}</${tag}>`;
        return html;
    }
}
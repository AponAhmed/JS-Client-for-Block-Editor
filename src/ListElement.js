import Element from "./Element.js";

export default class ListElement extends Element {
    constructor(listType, items) {
        super('List');
        this.listType = listType;
        this.items = items;
    }

    addChild(item) {
        this.items.push(item);
    }

    async render(indent = 0) {
        const indentation = '\t'.repeat(indent);
        let html = `\n${indentation}<${this.listType}`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += '>';

        for (const item of this.items) {
            html += await item.render(indent + 1);
        }

        html += `\n${indentation}</${this.listType}>`;

        return html;
    }
}
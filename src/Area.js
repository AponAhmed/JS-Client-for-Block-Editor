
import Element from "./Element.js";

export default class Area extends Element {
    constructor(elementData) {
        super('Area');
        this.childs = [];
        this.dir = null;
        this.width = 100;

        this.addClass('area');
        this.dir = elementData.direction || 'row';
        this.width = parseInt(elementData.width) || 100;
        this.styles = elementData.more.styles || {};
        this.setStyleAttribute();

        if (this.dir) {
            this.addClass(`dir-${this.dir}`);
        }
        if (this.width) {
            this.addClass(`w-${this.width}`);
        }
        if (elementData.more.customClass) {
            this.addClass(elementData.more.customClass);
        }
    }

    addChild(child) {
        this.childs.push(child);
    }

    async render(indent = 0) {
        const indentation = '\t'.repeat(indent);

        // Screen size logic for rendering
        if (this.childs.length > 3) {
            switch (this.childs.length) {
                case 4:
                case 5:
                    this.addClass('tab-grid-2');
                    break;
                case 6:
                    this.addClass('tab-grid-3');
                    this.addClass('mob-grid-2');
                    break;
            }
        } else {
            if (indent > 0 && this.dir === 'row' && this.width >= 50) {
                this.addClass('tab-column');
                if (this.childs.length <= 2) {
                    this.addClass('mob-row');
                }
            }
        }

        this.addClass(`indent-${indent}`);
        let html = `\n${indentation}<div`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += '>';

        for (const child of this.childs) {
            html += await child.render(indent + 1);
        }

        html += `\n${indentation}</div>`;

        return html;
    }
}

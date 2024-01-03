export default class Element {
    constructor(type) {
        this.type = type;
        this.classes = [];
        this.attributes = {};
        this.styles = {};
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    addStyle(propertyName, propertyValue) {
        this.styles[propertyName] = propertyValue;
        this.styles = Object.fromEntries(Object.entries(this.styles).filter(([key, value]) => value));
        this.setStyleAttribute();
    }

    addClass(name) {
        this.classes.push(name);
        this.classes = [...new Set(this.classes)];
        this.setClassAttribute();
    }

    setStyleAttribute() {
        delete this.attributes['style'];
        if (Object.keys(this.styles).length > 0) {
            this.setAttribute("style", Object.entries(this.styles).map(([prop, value]) => `${prop}:${value}`).join(";"));
        }
    }

    setClassAttribute() {
        delete this.attributes['class'];
        if (this.classes.length > 0) {
            this.setAttribute("class", this.classes.join(" "));
        }
    }

    async render(indent = 0) {
        const indentation = '\t'.repeat(indent);
        let html = `\n${indentation}<${this.type}`;

        for (const [name, value] of Object.entries(this.attributes)) {
            html += ` ${name}="${value}"`;
        }

        html += '>';

        return html;
    }
}
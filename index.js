import Area from "./src/Area.js";
import Content from "./src/Content.js";
import Image from "./src/Image.js";
import ListElement from "./src/ListElement.js";
import TextElement from "./src/TextElement.js";

export default class ElementFactory {
    static async createElement(elementData) {
        let element;

        switch (elementData.type) {
            case 'Area':
            case 'Column':
                element = new Area(elementData);
                if (elementData.childs && Array.isArray(elementData.childs)) {
                    for (const childData of elementData.childs) {
                        const child = await ElementFactory.createElement(childData);
                        if (child) {
                            element.addChild(child);
                        }
                    }
                }
                break;
            case 'Editor':
                element = new Content(elementData);
                break;
            case 'Image':
                element = new Image(elementData);
                break;
            case 'H':
            case 'P':
            case 'li':
                const content = elementData.content || '';
                const tag = elementData.tag || elementData.type.toLowerCase();
                element = new TextElement(tag, content);

                if (elementData.hasOwnProperty('align') && elementData.align) {
                    element.addClass(`align-${elementData.align}`);
                }
                if (elementData.hasOwnProperty('more') && elementData.more.customClass) {
                    element.addClass(elementData.more.customClass);
                }
                break;
            case 'List':
                const listType = elementData.listType || 'ul';
                const items = elementData.items && Array.isArray(elementData.items) ? elementData.items : [];
                element = new ListElement(listType, []);

                for (const item of items) {
                    const child = await ElementFactory.createElement({ type: 'li', content: item });
                    element.addChild(child);
                }
                break;
            default:
                // Handle other element types as needed
                element = null;
        }

        return element;
    }

    static async json2html(string = "[]") {
        const jsonArray = JSON.parse(string);
        let htmlOutput = '';

        for (const elementData of jsonArray) {
            const element = await ElementFactory.createElement(elementData);
            if (element) {
                htmlOutput += await element.render();
            }
        }

        return htmlOutput;
    }
}

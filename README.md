# JS-Client-for-Block-Editor
 The Block Editor JS Client is a JS Module that facilitate the creation and rendering of HTML elements for a block editor(From JSON data). Json Data generate by a JavaScript App linked Below. It provides an object-oriented approach to building dynamic and customizable layouts.


## JSON Builder
   Here is the JSON builder for a block editor : [BlockEditor](https://github.com/AponAhmed/BlockEditor)<br>
   A quick preview of JSON Builder [Codepen](https://codepen.io/apon22/full/abXPPyB)


## ElementFactory Class

The `ElementFactory` class is part of the Aponahmed HtmlBuilder library, providing a convenient way to create HTML elements from JSON data.

## Usage

### Installation

Include the `ElementFactory` class in your project by importing it.

```javascript
import ElementFactory from "./path/to/ElementFactory.js";
```

### Methods

#### `createElement(elementData: object): Element`

This method creates an HTML element based on the provided `elementData`. It supports various element types such as 'Area', 'Column', 'Editor', 'Image', 'H', 'P', 'li', and 'List'.

```javascript
const element = ElementFactory.createElement({ type: 'H', content: 'Hello', tag: 'h1' });
```

#### `json2html(string: string): string`

This method converts a JSON string to HTML by creating elements using `createElement` for each item in the JSON array.

```javascript
const jsonData = '[{"type":"Area","direction":"column","childs":[{"type":"H","content":"Hello","tag":"h1"}]}]';
const htmlOutput = ElementFactory.json2html(jsonData);
console.log(htmlOutput);
```

### Classes

#### `Element`

This is an abstract class representing a generic HTML element. Other classes, such as `Area`, `TextElement`, `Content`, `Image`, `ImageWP`, and `ListElement`, extend this class to provide specialized functionality.

#### `Area`

Represents an HTML `<div>` element with child elements. It supports customization of direction, width, and additional styles.

#### `TextElement`

Represents text-based HTML elements such as headings (`<h1>`, `<h2>`, etc.) and paragraphs (`<p>`).

#### `Content`

Represents a content area with customizable styles and content.

#### `Image`

Represents an HTML `<img>` element with alignment, source, width, height, and custom class options.

#### `ImageWP`

An extension of `Image` specifically designed for WordPress, including support for attachment ID and `src-set`.

#### `ListElement`

Represents HTML list elements (`<ul>` and  `<ol>`) with child items.

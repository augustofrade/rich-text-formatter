import { EMOJIDICTIONARY } from "./EmojiDictionary.js";
import Cursor from "./Cursor.js";


export default class RichTextFormatter {
    constructor(input) {
        this.input = input;
        this.cursorOffset = 0;
        console.log("adicionado")
        input.addEventListener("keyup", this._onChange.bind(this));
    }

    _onChange(e) {
        this.format(e.target);
    }

    format(el = this.input) {
        this.cursorOffset = Cursor.getCurrentCursorPosition(el);
        const currentText = el.innerHTML;
        const newText = currentText.replace(/\*\*(\s*[a-z]+\s*)*\*\*|:[a-z]*:/gi, this.replaceOcurrences.bind(this));
        if(currentText != newText) {
            el.innerHTML = newText;
            el.focus();
            Cursor.setCurrentCursorPosition(this.cursorOffset, el);
        }
    }

    replaceOcurrences(text) {
        const isEmoji = new RegExp(":[a-z]*:", "gi").test(text);
        const isBold = !!text.match(/\*\*(\s*[a-z]+\s*)*\*\*/gi);
        if(isEmoji) {
            const emoji = this._toEmoji(text);
            if(emoji) return emoji;
        } else if(isBold) {
            return this._toBold(text);
        }
        return text;
    }

    _toBold(text) {
        this.cursorOffset -= text.length - 4;
        const cleanedText = text.substring(2, text.length - 2);
        return `<b>${cleanedText}</b>`;
    }

    _toEmoji(text) {
        const cleanedText = text.substring(1, text.length - 1);
        const emoji = EMOJIDICTIONARY[cleanedText];
        if(!emoji) return undefined;
        this.cursorOffset -= text.length - 1;
        return `&#x${emoji};`;
    }
}
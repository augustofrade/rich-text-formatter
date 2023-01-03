import RichTextFormatter from "./RichTextFormatter.js";

// Initialize the RichTextFormatter
const validator = new RichTextFormatter(document.getElementById("textarea"));
validator.format();

// Set focus when clicking anywhere on the page
Array.from(document.getElementsByClassName("paper__inner")).forEach(function(el) {
    el.addEventListener("click", () => el.children[0].focus()) ;
});
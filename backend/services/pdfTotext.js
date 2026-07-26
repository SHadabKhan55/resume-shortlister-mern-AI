const { PDFParse } = require("pdf-parse");

async function pdfTotext(cv) {
   

    const parser = new PDFParse({
        url: cv
    });

    return await parser.getText();
}

module.exports = { pdfTotext };
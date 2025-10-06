async function mergeImages(){
    const images = Array.from(document.querySelectorAll('img'));
    if(!images.length){
        throw new Error("No images found on the page.");
    }
    const srcArray = images.map(img => img.src);

    const mergedDataUrl = await mergeImages(srcArray, { direction: true });

    const mergedImg = new Image();
    mergedImg.src = mergedDataUrl;
    
    await new Promise(resolve => { mergedImg.onload = resolve;})

    const canvas = document.createElement('canvas');
    canvas.width = mergedImage.width;
    canvas.height = mergedImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(mergedImg, 0, 0);

    return ctx;
}

async function performOCR() {
    const canvas = await mergeImages();

    const worker = Tesseract.createWorker({
        logger: m => console.log(m)
    });
    await worker.load();
    await worker.loadLanguage('kor');
    await worker.initialize('kor');

    const { data: { text, words } } = await worker.recognize(canvas);
    await worker.terminate();

    console.log("OCR Text:", text);
    console.log("Words:", words);

    highlightWords(words);
    return text;
}

// Highlight OCR words on the page
function highlightWords(words) {
    words.forEach(word => {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = word.bbox.x0 + "px";
        div.style.top = word.bbox.y0 + "px";
        div.style.width = (word.bbox.x1 - word.bbox.x0) + "px";
        div.style.height = (word.bbox.y1 - word.bbox.y0) + "px";
        div.style.backgroundColor = "rgba(255,255,0,0.3)";
        div.style.cursor = "pointer";
        div.title = word.text;

        div.onclick = () => translateWord(word.text);

        document.body.appendChild(div);
    });
}

performOCR().catch(console.error);
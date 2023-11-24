export function readImageIntoMemory (file, elementImage) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.name = file.name;
    return new Promise(function (resolve) {
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function (el) {
            const elem = document.createElement('canvas');

            let scaledMultipier = el.target.height / elementImage.clientHeight;
            elem.width = Math.round(el.target.width / scaledMultipier);
            elem.height = elementImage.clientHeight;

            const ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
            const dataURL = ctx.canvas.toDataURL('image/jpeg', 1);

            resolve({dataUrl: dataURL, multiplierImage: scaledMultipier});
        }
    }
    });
}
export function readFileIntoMemory (file) {
    let reader = new FileReader();
    return new Promise(function (resolve) {
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            resolve(reader.result)
        }
    });
}
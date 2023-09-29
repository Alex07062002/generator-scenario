export function readFileIntoMemory (file, callback) {
    let reader = new FileReader();
    reader.onload = function () {
        callback({
            name: file.name,
            size: file.size,
            type: file.type,
            content: new Uint8Array(this.result)
        });
    };
    reader.readAsArrayBuffer(file);
    return callback.content;
}
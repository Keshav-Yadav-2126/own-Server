import path from "path";
import fs from "fs";
export function serveFile(filePath, response){
    const rootPath = getCurrentDirPath();
    const fullPath = path.join(rootPath,'public', filePath);
    const stream = fs.createReadStream(fullPath);
    stream.pipe(response);   
}

function getCurrentDirPath(){
    return import.meta.dirname;
}
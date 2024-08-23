import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SNAPSHOT_HTML } from './regex.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// paths
const PATH_TO_SNAPSHOTS = path.resolve(__dirname, '../../__snapshots__');
const PATH_TO_HTML = path.resolve(__dirname, '../../__html__');
export const generateHtmlFromSnapshots = () => {
    console.log('working directory: ', PATH_TO_SNAPSHOTS);
    console.log('destination directory:', PATH_TO_HTML, '\n');
    const fileList = fs.readdirSync(PATH_TO_SNAPSHOTS);
    for (const file of fileList) {
        fs.readFile(`${PATH_TO_SNAPSHOTS}/${file}`, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const htmlMatches = SNAPSHOT_HTML.exec(data);
            if (htmlMatches === null) {
                console.error('Could not find any matches for file:', file);
                return;
            }
            let fileId = 0;
            for (const match of htmlMatches) {
                const newFileName = `${file.split('.')[0]}_${fileId}.html`;
                fs.writeFile(`${PATH_TO_HTML}/${newFileName}`, match, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log(`${file} -> ${newFileName}`);
                    }
                });
                fileId += 1;
            }
        });
    }
};
generateHtmlFromSnapshots();

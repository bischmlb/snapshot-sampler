import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SNAPSHOT_HTML } from './regex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// paths
const PATH_TO_SNAPSHOTS = path.resolve(__dirname, '../../__snapshots__');
const PATH_TO_HTML = path.resolve(__dirname, '../../__html__');

export const generateHtmlFromSnapshots = () => {
    if (!fs.existsSync(PATH_TO_HTML)) {
        console.log('Creating directory:', PATH_TO_HTML, '...');
        fs.mkdirSync(PATH_TO_HTML);
        console.log('Directory created.', '\n');
    }

    console.log('Working directory: ', PATH_TO_SNAPSHOTS);
    console.log('Destination directory:', PATH_TO_HTML, '\n');

    const fileList = fs.readdirSync(PATH_TO_SNAPSHOTS);

    for (const file of fileList) {
        fs.readFile(`${PATH_TO_SNAPSHOTS}/${file}`, 'utf-8', (err, data) => {
            if (err) {
                return console.error(err);
            }

            const htmlMatches = data.matchAll(SNAPSHOT_HTML);
            if (htmlMatches === null) {
                return console.error('Could not find any matches for file:', file);
            }

            let fileId = 0;
            for (const match of htmlMatches) {
                const newFileName = `${file.split('.')[0]}_${fileId}.html`;
                fs.writeFile(`${PATH_TO_HTML}/${newFileName}`, match[0], (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${file} -> ${newFileName}`);
                    }
                });
                fileId += 1;
            }
        });
    }
};

// TODO make this part of server
generateHtmlFromSnapshots();

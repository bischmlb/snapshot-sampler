import fs from 'fs';
import { SNAPSHOT, SNAPSHOT_DESCRIPTION, SNAPSHOT_HTML } from './regex';
import { PATH_TO_DATA, PATH_TO_SNAPSHOTS } from '../constants';

export type DataFile = {
    title: string;
    description: string;
    html: string;
};

export const snapshotParser = () => {
    if (!fs.existsSync(PATH_TO_DATA)) {
        console.log('Creating directory:', PATH_TO_DATA, '...');
        fs.mkdirSync(PATH_TO_DATA);
        console.log('Directory created.', '\n');
    }

    console.log('--------------');
    console.log('SNAPS:', PATH_TO_SNAPSHOTS);
    console.log('HTML:', PATH_TO_DATA);
    console.log('--------------');

    const fileList = fs.readdirSync(PATH_TO_SNAPSHOTS);

    if (!fileList.length) {
        return;
    }

    for (const file of fileList) {
        fs.readFile(`${PATH_TO_SNAPSHOTS}/${file}`, 'utf-8', (err, data) => {
            if (err) {
                return console.error(err);
            }
            const matches = data.matchAll(SNAPSHOT);
            if (matches === null) {
                return console.error('Could not find any matches for file:', file);
            }
            let fileId = 0;
            for (const match of matches) {
                const [meta] = match[0].matchAll(SNAPSHOT_DESCRIPTION);
                const [html] = match[0].matchAll(SNAPSHOT_HTML);

                const data = {
                    /* Snapshot title */
                    title: meta[1],
                    /* Snapshot test case description */
                    description: meta[2],
                    /* Expected html outcome for test */
                    html: html[0],
                };

                const newFileName = `${file.split('.')[0]}_${fileId}.json`;
                // Write data file
                fs.writeFile(`${PATH_TO_DATA}/${newFileName}`, JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                fileId += 1;
            }
        });
    }
};

snapshotParser();

/**
 * sends all email cases in data folder that were generated from snapshots
 */

import fs from 'fs';
import { PATH_TO_DATA } from '../constants';
import Mailer from './Mailer';
import { DataFile } from '../utils/snapshotParser';

const fileList = fs.readdirSync(PATH_TO_DATA);

fileList.forEach((file, i) => {
    setTimeout(() => {
        fs.readFile(`${PATH_TO_DATA}/${file}`, 'utf-8', async (_, data) => {
            const dataParsed: DataFile = JSON.parse(data);
            const subject = `(${dataParsed.title}): ${dataParsed.description}`;
            console.log('Sending:', subject);
            await Mailer.send({ to: 'mathiasbischo@gmail.com', subject, html: dataParsed.html });
        });
    }, i * 5000);
});

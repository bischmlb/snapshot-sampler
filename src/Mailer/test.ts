import fs from 'fs';
import { PATH_TO_DATA } from '../constants';
import Mailer from './Mailer';
import { DataFile } from '../utils/snapshotParser';

fs.readFile(`${PATH_TO_DATA}/AddUserToWorkshop_0.json`, 'utf-8', (_, data) => {
    const dataParsed: DataFile = JSON.parse(data);
    const subject = `(${dataParsed.title}): ${dataParsed.description}`;
    Mailer.send({ to: 'mathiasbischo@gmail.com', subject, html: dataParsed.html });
});

import path from 'path';
import { fileURLToPath } from 'url';

const __FILENAME = fileURLToPath(import.meta.url);
const __DIRNAME = path.dirname(__FILENAME);

// paths
export const PATH_TO_SNAPSHOTS = path.resolve(__DIRNAME, '../__snapshots__');
export const PATH_TO_DATA = path.resolve(__DIRNAME, '../__data__');

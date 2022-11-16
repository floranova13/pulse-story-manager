/* eslint-disable indent */
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { getFolderId } from './utils.js';
import { fixText } from '../../utils/index.js';

/**
 * Create file in Google Drive
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 * @param {string} filePath Path to file to upload.
 * @param {string} folderName Name of folder to upload file to.
 */
const createFile = async (authClient, filePath, folderName) => {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const fileName = filePath.split('\\').pop();
  const folderId = getFolderId(folderName);

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: 'text/markdown',
    body: await fs.createReadStream(filePath),
  };
  const res = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  console.log(`File Uploaded: [Name: ${fileName}, ID: ${res.data.id}]`);
};

const uploadChapters = async (authClient) => {
  const chapters = await fs.readdir('../../files/chapters');
  for (const chapter of chapters) {
    await createFile(
      authClient,
      path.join(process.cwd(), `files/chapters/${chapter}`),
      'Chapters'
    );
  }

  console.log('All chapters uploaded');
};

const createChapterFiles = () => {
  for (let i = 2; i <= 113; i++) {
    const chapter = `chapter-${i}.md`;
    fs.writeFileSync(
      `G:/My Drive/stories/blightbane/chapters/current/${chapter}`,
      `# Chapter ${i}: \r\n---`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
};

const clearChapterFiles = () => {
  const currentChaptersPath = process.env.CHAPTERS_CURRENT_PATH;

  fs.readdirSync(currentChaptersPath).forEach((file) => {
    if (
      ['.md', 'txt'].includes(path.extname(file)) &&
      file.includes('chapter-')
    ) {
      const chapterPath = path.join(currentChaptersPath, file);
      const content = fs.readFileSync(chapterPath, 'utf8');

      fs.writeFileSync(chapterPath, fixText(content));
    }
  });
};

export default {
  createFile,
  uploadChapters,
  createChapterFiles,
  clearChapterFiles,
};

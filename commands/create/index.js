/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { google } from 'googleapis';
import { promises as fs } from 'fs';
import { getFolderId } from './utils';

/**
 * Create file in Google Drive
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 * @param {string} filePath Path to file to upload.
 * @param {string} folderName Name of folder to upload file to.
 */
const createFile = async (authClient, filePath, folderName) => {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const fileName = filePath.split('/').pop();
  const folderId = getFolderId(folderName);

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: 'application/vnd.google-apps.document',
    body: await fs.readFile(filePath),
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
    await createFile(authClient, `../../files/chapters/${chapter}`, 'Chapters');
  }

  console.log('All chapters uploaded');
};

export default { createFile, uploadChapters };

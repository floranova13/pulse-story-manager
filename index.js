import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import command from './commands/index.js';
import { setAllChapterData } from './commands/tag/index.js';
import {
  analyzeWordFrequency,
  analyzeFullWordFrequency,
  recordWordFrequency,
  getCurrentChaptersWords,
  getIrregularWords,
} from './commands/language/index.js';

dotenv.config();

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

const runApp = async () => {
  try {
    const client = await authorize();
    // command.create.createFile(
    //   client,
    //   path.join(process.cwd(), '/files/chapters/current/chapter-1.md'),
    //   'chapters-current'
    // );
    // command.scan.readChapter(1);
    // console.log(command.scan.readCurrentChapters());
    // setAllChapterData();
    // command.create.clearChapterFiles();
    console.log(getIrregularWords());
  } catch (error) {
    console.log(error);
  }
};

runApp();

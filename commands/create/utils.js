/* eslint-disable indent */
export const getFolderId = (folderName) => {
  switch (folderName.toLowerCase()) {
    case 'notes':
      return process.env.FOLDER_NOTES;
    case 'notes-unsorted':
      return process.env.FOLDER_NOTES_UNSORTED;
    case 'chapters':
      return process.env.FOLDER_CHAPTERS;
    case 'chapters-unsorted':
      return process.env.FOLDER_CHAPTERS_UNSORTED;
    case 'chapters-current':
      return process.env.FOLDER_CHAPTERS_CURRENT;
    case 'chapters-drafts':
      return process.env.FOLDER_CHAPTERS_DRAFTS;
  }
};

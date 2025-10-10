import { LocaleTranslations } from '../types/types.config.js';

export const enUsTranslation: LocaleTranslations = {
  properties: {},
  labels: {},
  actions: {
    softDelete: 'Delete',
    '[@adminjs/relations]_addItem': 'Add Item',
    '[@adminjs/relations]_removeRelation': 'Remove Relation',
    '[@adminjs/relations]_removeRecord': 'Remove Item',
  },
  buttons: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    contactUs: 'Contact Us',
    changePassword: 'Change Password',
    remove: 'Remove',
  },
  messages: {
    welcomeOnBoard_subtitle:
      'Use the side menu to manage users, events, and clubs.',
    '[@adminjs/relations]_noRelationRecordsTitle': 'No Related Records',
    '[@adminjs/relations]_noRelationRecords': '',
    '[@adminjs/relations]_mnRelationAlreadyExists': 'Relation already exists',
    '[@adminjs/relations]_relationSuccessfullyDeleted':
      'Relation successfully deleted',
    isLoading: 'Loading...',
    maxLengthError: 'The field cannot be longer than {{max}} characters.',
  },
  components: {
    All: 'All',
    Internal: 'Internal',
    External: 'External',
    Applying: 'Applying...',
    Type: 'Type',
    Filter: 'Filter',
    Filters: 'Filters',
    UploadEdit: {
      acceptedSize: 'Max size: {{maxSize}}',
      acceptedType: 'Supported types: {{mimeTypes}}',
      unsupportedSize: 'File {{fileName}} is too large',
      unsupportedType: 'File type {{fileName}} is not supported',
      placeholder: 'Drag and drop files here, or click to browse.',
    },
  },
};

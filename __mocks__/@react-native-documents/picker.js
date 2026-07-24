module.exports = {
  pick: jest.fn(),
  types: {
    allFiles: '*/*',
    audio: 'audio/*',
    video: 'video/*',
    plainText: 'text/plain',
  },
  errorCodes: {
    OPERATION_CANCELED: 'OPERATION_CANCELED',
  },
  isErrorWithCode: () => false,
};

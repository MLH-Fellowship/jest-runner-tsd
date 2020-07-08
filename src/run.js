const tsd = require('tsd');
const { pass, fail } = require('create-jest-runner');

module.exports = async ({ testPath }) => {
  // Convert absolute path to relative path
  const testFile = testPath.replace(process.cwd(), '');
  const start = +new Date();
  const diagnose = await tsd.default({
    cwd: process.cwd(),
    testFiles: [ testFile ]
  });

  // Currently only reports a single error.
  if (diagnose.length > 0) {
    return fail({
      start,
      end: +new Date(),
      test: {
        path: diagnose[0].fileName, 
        errorMessage: diagnose[0].message, 
        title: diagnose[0].severity + ' ' + testFile
      }
    });
  }

  return pass({
    start, end: +new Date(), 
    test: {
      path: testPath
    } 
  });
};

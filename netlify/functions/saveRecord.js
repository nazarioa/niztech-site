const {GoogleSpreadsheet} = require('../../node_modules/google-spreadsheet');

const getSpreadsheet = async (sheetId, email, privateKey) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth({
    client_email: email,
    private_key: privateKey,
  });
  return doc;
};

exports.handler = async function (event, context) {
  // validate input
  // authengticate sheet
  // store results

  let doc;
  try {
    doc = await getSpreadsheet(process.env.GOOGLE_CONTACTSHEET_ID, process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, process.env.GOOGLE_PRIVATE_KEY);
  } catch (err) {
    return {statusCode: 501, body: `
    err: ${err.toString()}
    GOOGLE_CONTACTSHEET_ID: ${process.env.GOOGLE_CONTACTSHEET_ID}
    GOOGLE_SERVICE_ACCOUNT_EMAIL: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL} 
    GOOGLE_PRIVATE_KEY: ${process.env.GOOGLE_PRIVATE_KEY}
    `};
  }

  let data;
  try {
    data = JSON.parse(event?.body ?? {});
  } catch (err) {
    return {statusCode: 502, body: err.toString()};
  }

  const newEntry = {
    Name: data?.name ?? 'Petter',
    Email: data?.email ?? 'person@gmail.com',
    Message: data?.message ?? 'hello! How are you?!'
  };

  try {
    await doc.sheetsByIndex[0].addRow(newEntry);
  } catch (err) {
    return {statusCode: 503, body: err.toString()};
  }
  return({statusCode: 200, body: 'All is gravy' + JSON.stringify(newEntry)});
};


const {GoogleSpreadsheet} = require('google-spreadsheet');

const getSpreadsheet = async (sheetId, email, privateKey) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth({
    client_email: email,
    private_key: privateKey,
  });
  return doc;
};

exports.handler = async function (event, context, callback) {
  // validate input
  // authengticate sheet
  // store results

  let doc;
  try {
    doc = getSpreadsheet(process.env.GOOGLE_CONTACTSHEET_ID, process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, process.env.GOOGLE_PRIVATE_KEY);
  } catch (err) {
    callback({statusCode: 500, body: err.toString()});
    return {statusCode: 500, body: err.toString()};
  }

  const newEntry = {
    Name: JSON.parse(event?.body)?.name ?? 'Petter',
    Email: JSON.parse(event?.body)?.email ?? 'person@gmail.com',
    Message: JSON.parse(event?.body).message ?? 'hello! How are you?!'
  };

  try {
    const sheet = await doc.sheetsByIndex[0];
    sheet.addRow(newEntry);
  } catch (err) {
    callback({statusCode: 500, body: err.toString()});
    return {statusCode: 500, body: err.toString()};
  }
  callback({statusCode: 200, body: 'All is gravy' + JSON.stringify(newEntry)});
};


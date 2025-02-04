const { GoogleSpreadsheet } = require('../../node_modules/google-spreadsheet');

const getSpreadsheet = async (sheetId, email, privateKey) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth({
    client_email: email,
    private_key: privateKey,
  });
  await doc.loadInfo();
  return doc;
};

exports.handler = async function (event) {
  // validate input
  // authenticate sheet
  // store results

  let data;
  try {
    data = JSON.parse(event?.body ?? '{}');
  } catch (err) {
    return { statusCode: 502, body: err.toString() };
  }

  const googleKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n');

  let doc;
  try {
    doc = await getSpreadsheet(
      process.env.GOOGLE_CONTACTSHEET_ID,
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      googleKey,
    );
  } catch (err) {
    return {
      statusCode: 501,
      body: `
    err: ${err.toString()}
    `,
    };
  }

  try {
    const sheet = await doc.sheetsByIndex[0];
    await sheet.addRow({
      Name: data?.name ?? '--no-name--',
      Email: data?.email ?? '--no-email--',
      Message: data?.message ?? '--no-message--',
    });
  } catch (err) {
    return { statusCode: 503, body: err.toString() };
  }
  return { statusCode: 200, body: 'All is gravy' };
};

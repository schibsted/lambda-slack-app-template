exports.parseSlackPayload = (event) => {
  let body = event.body;

  if (event.isBase64Encoded) {
    try {
      body = atob(event.body);
    } catch (error) {
      throw "Request body contains invalid Base64";
    }
  }

  try {
    json = JSON.parse(body);
  } catch (error) {
    throw "Request body contains invalid JSON";
  }

  return json;
};

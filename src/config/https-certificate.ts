import * as fs from 'fs';
import * as path from 'path';

const httpsCertificate = () => {
  const dirKey = process.env.SSL_KEY_PATH;
  const dirCert = process.env.SSL_CERT_PATH;

  if (!dirKey || !dirCert) {
    return null;
  }

  const httpsOptions = {
    key: fs.readFileSync(path.join(dirKey)),
    cert: fs.readFileSync(path.join(dirCert)),
  };
  return httpsOptions;
};

export { httpsCertificate };

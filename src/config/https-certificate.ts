import * as fs from 'fs';
import * as path from 'path';

const httpsCertificate = () => {
  const isProduction = process.env.PRODUCTION === 'true';
  if (!isProduction) {
    return {};
  }

  const dir = 'atmosfera-soltec.com';

  const httpsOptions = {
    key: fs.readFileSync(path.join(`/etc/letsencrypt/live/${dir}/privkey.pem`)),
    cert: fs.readFileSync(
      path.join(`/etc/letsencrypt/live/${dir}/fullchain.pem`),
    ),
  };
  return httpsOptions;
};

export { httpsCertificate };

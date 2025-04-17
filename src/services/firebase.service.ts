import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseAccount = {
  type: 'service_account',
  project_id: 'festiva-548e2',
  private_key_id: '5dde3329755e040898150be97d8659c890cda17c',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqwvVciiKwne4h\nNpjaIeG+DOIEx7i+jsj/KEvtUR0vVw8rtH2CA0LZOO+IXXh72S9Qtgf7HOyirW+c\ne9vjG30vIZwSMMyoHgndYkLWYXss3+8iPmMTBmQzH0z1Owh27lKFcuACnPDtuYr+\nr4H8q6ELEEkAEKaA6B8/RXLZc0spWucrZMww1JoA43GvtxxXV9x6cU5YWj6WK1pa\n18XJf218X3sTTQiAL/BiTvMz+khyoLAIQjBETM875ZMyfdbZs5hXGiFm+dTcf05i\nNdlAGX87zdpSg6AubhQpUdPg0hHtwr10LuyZiSqSO6ffp1CVnYNZRdSJdDlEp4sJ\nn2wx9jpfAgMBAAECggEAAs+46HAhyBShkgxrEdRS+iUOJ5P+N6z0JDdOoLagK2Jc\njpSnKFfTZu4oC2+2hxt5SvPkR78fKkJ+vu3PHfsa4YbFIguJow7zjKCMhykNtRxu\nvHqYePy285yFUNhK+GJOG4Jbq89XrCJM5oqPMlDFEwCOoyCjDSZFNW54SJo8V47v\nsuqs1OwwQfuqX6K1g2JiSaHqce/Akq83R6MX5qEyb8I/XbQW0la+vyLaEmyD+1ZW\n1PVxCtoV5StCMjim64XOuxQIQ1BD2tfruy46ptLj1aBXQdUwuWnNIaYF7awXV8Dk\nKGToWdvEVxXLE3Z2mxNLAG3vOmSRQ3WgBHwdme54SQKBgQDRTC5OJvy71yQZk6p0\nRyop/NIDWSH8IIvMVB6ncfJg6FwX3iHrrOgO5zkIAMFUc1JooujoHyYO4ebBIQKG\nOOKAqwc0ztLrBa6shQzM9dDK9Jf020ZEoQpP2PQue15w9nqUTu54s5cpjlP7aBf7\n37VVgTTPjulQTq4JRPaJZrsyOwKBgQDQ3XacgLQ8jPBfJ+SGWcCjEKxS3IiRmX/F\nV4oDmQK2dufWDTOHfUJnUl9rQNgOXiHfK2SrfG52gRs0an0t8n9qgHmTTcPv+2fd\noOgUWCdVBAZ4/45eBNen+UGDTbiquvaQwkzZvKJ50GN7xMcR6ePj4sIYHmq5gMvX\nJ5Btk+7SLQKBgFWuNyKdSUdoionB7rzNSVCJBDyEp6n8dN5/7VClEBFl7hWDRSWi\n0hkPxUQmcv6seycE0g38emsLRZj4d30VGnyMB1Yx+RxnZhuQGC5rzz7WpMKDZZ/A\nwWTwrv28WWwrKwE90tgsxQwpDO5VrcPZz/UiAMmbep36p7p5teeH28hzAoGBAI0e\nlR14+E5RC7e/RHBiA/4pLcVuq/d0Nxgm5WE46NRP0qSVltNclpko1r+ouFI817Xp\no8MZ96ip4q+vo5R/3AchdwNH77MdsjfUl/nm9exDI/xs7swniW48wz7sLHFukVmN\nbk9PXJfhbNYbRkWcOhWnCG0zX/imRRPB75uZ8CqhAoGAPvOzgqmTaQVeFTsbs6le\nFOuSfKlKgeZNpLwL9MIjStT9Wuane/gKVXQOP3VnlNQHdQCVkqMqiBJJAZ9ndFHY\nMzsRaIA0p2VuuI0xMMZ7rY8MuVGGU+4bl+eIuj1D/x8tfwCjyny9jHRx2Irqhg0R\nXTCSE67UiptxNKvi/fE8fDM=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-fbsvc@festiva-548e2.iam.gserviceaccount.com',
  client_id: '116676716762849429197',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40festiva-548e2.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        firebaseAccount as admin.ServiceAccount,
      ),
      storageBucket: 'gs://festiva-548e2.firebasestorage.app',
    });
  }

  async deleteFile(filePath: string) {
    const file = admin.storage().bucket().file(filePath);
    await file.delete();
    return { message: 'File deleted successfully' };
  }
}

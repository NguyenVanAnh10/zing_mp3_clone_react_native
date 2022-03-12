import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';

import configs from 'configs/configs';

export const getSigNumber = ({
  api,
  id,
  ctime,
}: {
  api: string;
  id: string;
  ctime: string | number;
}) => {
  // '/api/v2/song/get/streaming'
  return hmacSHA512(
    `${configs.apiVersion}${api}${sha256(
      `ctime=${ctime}id=${id}version=${configs.appVersion}`,
    )}`,
    configs.secretKey,
  );
};

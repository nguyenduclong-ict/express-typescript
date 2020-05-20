import request, {
  CoreOptions,
  Response,
  UriOptions,
  UrlOptions,
} from 'request';

export function requestPromise(
  options: (UriOptions & CoreOptions) | (UrlOptions & CoreOptions)
): Promise<Response> {
  return new Promise((resolve, reject) => {
    request(options, (error, rs) => {
      if (error) {
        reject(error);
      } else {
        resolve(rs);
      }
    });
  });
}

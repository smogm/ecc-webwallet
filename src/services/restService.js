// @flow

import { set, isEmpty } from 'lodash';
import { apiEndpoint } from './constants';

export async function ApiService({ api, thirdParty, method, params }) {
  const headers = {};

  let path = `${apiEndpoint}${api}`;

  if (thirdParty) {
    path = api;
  }

  set(headers, 'Accept', 'application/json');
  // set(headers, 'Content-Type', 'application/json');
  // set(headers, 'Access-Control-Expose-Headers', 'authorization');
  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (thirdParty) {
        return {
          result: 'ok',
          data,
        };
      }
      return data;
    })
    .catch(() => {
      return {
        result: 'error',
        message: 'Please check your internet connection!',
      };
    });
}

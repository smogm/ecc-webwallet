// @flow

import { set, isEmpty } from 'lodash';

export async function ApiService({ api, encapsulate, method, params, expectJson }) {
  const headers = {};

  let path = api;

  set(headers, 'Accept', 'application/json');

  const reqBody = {
	//mode: 'no-cors',
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
    .then(response => {
		if (expectJson) {
			return response.json()
		}
		return response.text();
    })
    .then(data => {
		if (encapsulate) {
			return {
				success: true,
				result: data,
				error: ""
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

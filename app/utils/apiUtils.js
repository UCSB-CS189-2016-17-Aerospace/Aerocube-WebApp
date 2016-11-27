import request from './request';

/** Settings **/
const BASE_URL = 'https://127.0.0.1:5000';
const API_URL = `${BASE_URL}/api`;

/**
  Get headers as necessary
  @param headers {object}
**/
const getHeaders = (headers={}) => {
  return Object.assign({
      // No headers exist right now
    }, headers
  );
};

/*
  API class - contains static util fns.
  Utilizes request() from utils/request ->
  {request()} as return param refers to an object containing "data" or "err",
  as the result from request(...)
*/
export default class APIClient {
  constructor() {
    throw Error('APIClient is not to be instantiated.')
  };

  /**
    for endpoints that don't follow the standard method mapping
  **/
  static customRequest = (url, options) => request(`${BASE_URL}/${url}`, options);

  /**
    list view - GET with no pk
    @param endpoint {string}      API resource
    @param headers {object | default: empty object} - extra headers to send
    @returns {request()}
  **/
  static list = (endpoint, headers={}) => request(
    `${API_URL}/${endpoint}/`, {
      method: 'GET',
      headers: getHeaders(headers),
    }
  );

  /**
    post - POST w/ option to send data as a JSON string
    @param endpoint {string}      API resource
    @param data {object}          data to send with POST
    @returns {request()}
  **/
  static post = (endpoint, data, headers={}, asJson=false) => request(
    `${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: getHeaders(headers),
      body: asJson ? JSON.stringify(data) : data,
    }
  );

  /**
    PUT - full update
    @param endpoint {string}      API resource
    @param id {string}            PK to update
    @param data {object}          Information to update
    @returns {request()}
  **/
  static put = (endpoint, id, data, headers={}) => request(
    `${API_URL}/${endpoint}/${id}/`, {
      method: 'PUT',
      headers: getHeaders(headers),
      body: {
        data: JSON.stringify(data),
      },
    }
  );

  /**
    PATCH - partial resource update
    @param endpoint {string}      API resource
    @param id {string}            PK to patch
    @param data {object}          TODO how to format? field:value pairs?
  **/
  static patch = (endpoint, id, data, headers={}) => request(
    `${API_URL}/${endpoint}/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(headers),
      body: {
        data: JSON.stringify(data),
      },
    }
  );

  /**
    DELETE
    @param endpoint {string}      API resource
    @param id {string}            PK to delete
  **/
  static delete = (endpoint, id, headers={}) => request(
    `${API_URL}/${endpoint}/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(headers),
    }
  );
};

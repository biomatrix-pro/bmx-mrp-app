/* eslint-disable no-case-declarations */
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
  fetchUtils
} from 'react-admin'
import { stringify } from 'query-string'
import { Headers } from 'node-fetch'

export const ApiUrl = process.env.REACT_APP_API_PATH
console.log('API PATH')
console.log(ApiUrl)

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
  const token = window.localStorage.getItem('token')
  const options = { method: 'GET' }

  if (token) {
    options.headers = new Headers({ Authorization: `Bearer ${token}` })
  }

  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter)
      }
      return { url: `${ApiUrl}/${resource}?${stringify(query)}`, options }
    }
    case GET_ONE:
      return { url: `${ApiUrl}/${resource}/${params.id}`, options }
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids })
      }
      return { url: `${ApiUrl}/${resource}?${stringify(query)}`, options }
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id })
      }
      return { url: `${ApiUrl}/${resource}?${stringify(query)}`, options }
    }
    case UPDATE:
      options.method = 'PUT'
      options.body = JSON.stringify(params.data)
      return { url: `${ApiUrl}/${resource}/${params.id}`, options }
    case CREATE:
      options.method = 'POST'
      options.body = JSON.stringify(params.data)
      return { url: `${ApiUrl}/${resource}`, options }
    case DELETE:
      options.method = 'DELETE'
      return { url: `${ApiUrl}/${resource}/${params.id}`, options }
    case DELETE_MANY:
      options.method = 'DELETE'
      const query = {
        filter: JSON.stringify({ ...params.filter, ids: params.ids })
      }
      return { url: `${ApiUrl}/${resource}?${stringify(query)}`, options }

    default:
      throw new Error(`Unsupported fetch action type ${type}`)
  }
}

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
  const { headers, json } = response
  switch (type) {
    case GET_LIST:
      let cnt = 0
      if (headers && headers.get('content-range') && headers.get('content-range').split('/').pop()) {
        cnt = parseInt(headers.get('content-range').split('/').pop(), 10)
      }
      return {
        data: json.map(x => x),
        total: cnt
      }
    case CREATE:
      return { data: { ...params.data, id: json.id } }
    default:
      return { data: json }
  }
}

/**
 * @param {string} type: Request type, e.g GET_LIST
 * @param {string} resource: Resource name, e.g. "posts"
 * @param {Object} params: Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils
  const { url, options } = convertDataProviderRequestToHTTP(type, resource, params)
  return fetchJson(url, options)
    .then(response => convertHTTPResponseToDataProvider(response, type, resource, params))
}

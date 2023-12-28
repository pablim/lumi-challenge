import { makeRequest } from "../Api";

const urlCommon = '/invoice'

export const getClientNumbers = () => {

    return makeRequest.get(`${urlCommon}/get-client-numbers`)
        .then((response) => {
            return response
        })
}

export const getByClientNumber = (data) => {

    return makeRequest.get(`${urlCommon}/get-by-client-number`, data)
        .then((response) => {
            return response
        })
}

export const getDocument = (data) => {

    return makeRequest.get(`${urlCommon}/get-document`, data)
        .then((response) => {
            return response
        })
}

export const invoiceImport = (data) => {
    
    return makeRequest.post(`${urlCommon}/import`, data, {
        "Content-Type": "multipart/form-data"
    }).then((response) => {
        return response
    })
}
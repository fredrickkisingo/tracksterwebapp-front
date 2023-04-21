import apiClient from "../utils/apiClient";
export default {
    install: (app) => {
        app.config.globalProperties.$http = apiClient;
        const $http = app.config.globalProperties.$http;
        $http.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        $http.interceptors.response.use(
            function (response) {
                // Do something with response data
                return response;
            },
            function (error) {
                // Do something with response error
                return Promise.reject(error);
            }
        );

        app.provide('$fetch', $http)
    }
};
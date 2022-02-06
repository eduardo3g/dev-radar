import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { AXIOS_SERVER } from '../helper/config';

const api = axios.create({
    baseURL: AXIOS_SERVER,
});

api.interceptors.request.use(AxiosLogger.requestLogger);

export default api;
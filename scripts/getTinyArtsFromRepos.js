import { token } from '../store/accessToken.js';

export async function getTinyArtsFromRepos(authorName, repName, path, branchName, pictureNum) {
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token  ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);
    const { data } = await host.get(`/repos/${authorName}/${repName}/contents/${path}/${pictureNum}.jpg?ref=${branchName}`);
    return data.download_url;
}
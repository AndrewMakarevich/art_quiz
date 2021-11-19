import { token } from "../store/accessToken.js";
export async function getFullArtFromRepos(authorName, repName, path, branchName, pictureNumber) {
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token  ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);

    const { data } = await host.get(`/repos/${authorName}/${repName}/contents/${path}/${pictureNumber}full.jpg?ref=${branchName}`);
    return data.download_url;
}
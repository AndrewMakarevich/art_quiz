import { token } from '../store/accessToken.js';

function getRndNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

async function getFullArtsFromRepos(authorName, repName, path, branchName) {
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token  ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);

    const pictureNumber = getRndNumber(0, 240);
    const { data } = await host.get(`/repos/${authorName}/${repName}/contents/${path}/${pictureNumber}full.jpg?ref=${branchName}`);
    document.body.style.backgroundImage = `url(${data.download_url})`;
    console.log(data);
}
getFullArtsFromRepos('AndrewMakarevich', 'image-data', 'full', 'master');



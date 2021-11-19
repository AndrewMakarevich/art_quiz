class Router {
    constructor() {
        this._baseClass = 'route-component';
        this._routes = [
            {
                id: 0,
                path: '/authors',
                component: `
                <div class=${this._baseClass}>
                    
                </div>`,
                componentClassName: "categories-wrapper",
                name: 'Auhtors'
            },
            {
                id: 1,
                path: '/pictures',
                component: `
                <div class=${this._baseClass}>
                    
                </div>`,
                componentClassName: "categories-wrapper",
                name: 'Pictures'
            },
        ];
    }
    getRoutes() {
        return this._routes;
    }
    getBaseClass() {
        return this._baseClass;
    }
    setRoutes(routes) {
        this._routes = routes;
        return;
    }
}
export default new Router();
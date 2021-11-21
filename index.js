/*jshint esversion: 6 */

import router from './routes/router.js';
import categoriesStore from './store/categoriesStore.js';
import { createRouteButtons } from './scripts/createRouteButtons.js';
import { createNavButton } from './scripts/createNavButton.js';
import { createCategory } from './scripts/createCategories.js';



function setCurrentSection() {
    let altMenuExistence = false;
    const baseComponentClassName = router.getBaseClass();
    const paths = router.getRoutes();

    createRouteButtons();
    const sectionsButtons = document.querySelectorAll('.choose-section__btn');

    sectionsButtons.forEach(sectionButton => {
        sectionButton.addEventListener('click', (e) => {
            window.location.hash = e.target.dataset.location;
        });
    });

    function loadCurrentSection(hash) {

        let routeExistence = false;
        for (let route of paths) {
            if (route.path === hash) {
                routeExistence = route;
                break;
            }
        }
        if (routeExistence) {
            const main = document.querySelector('main');
            const navBar = document.querySelector('.nav-bar');
            const navBarButtons = navBar.querySelector('.nav-bar__buttons');
            const navBarLogo = navBar.querySelector('.nav-bar__logo-wrapper');
            // CREATING NAV BAR BUTTONS LIST
            if (!altMenuExistence) {
                // CREATING LOGO
                const h1 = document.createElement('h1');
                h1.classList.add('nav-bar__logo');
                h1.innerHTML = 'Art Quiz';
                navBarLogo.append(h1);
                //------
                const ul = document.createElement('ul');
                ul.classList.add('nav-bar__buttons__list');
                ul.append(createNavButton(hash, 'Home', '/start'));
                paths.forEach(path => {
                    ul.append(createNavButton(hash, path.name, path.path));
                });
                navBarButtons.append(ul);
                altMenuExistence = true;
            } else {
                document.querySelectorAll('.route-btn').forEach(btn => {
                    btn.classList.remove('active-route-btn');
                });
                document.querySelector(`button[data-route='${hash}']`).classList.add('active-route-btn');
            }

            // -------------------------------------------

            main.innerHTML = routeExistence.component;
            document.querySelector(`.${baseComponentClassName}`).classList.add(routeExistence.componentClassName);
            categoriesStore.categories[window.location.hash.split('#/')[1]].forEach((category) => {
                createCategory(category, 'AndrewMakarevich', 'image-data', 'img', 'master').then(obj => document.querySelector(`.${routeExistence.componentClassName}`).append(obj));
            });
        } else {
            window.location.hash = '/start';
            window.location.reload();
        }

    }
    window.addEventListener('load', () => {
        if (window.location.hash.split('#')[1] !== '/start') {
            loadCurrentSection(window.location.hash.split('#')[1]);

        }
    });
    window.addEventListener('hashchange', () => {
        loadCurrentSection(window.location.hash.split('#')[1]);
    });

}

setCurrentSection();
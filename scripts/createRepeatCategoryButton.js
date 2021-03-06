import { updateCategoryStatus } from "./updateCategoryStatus.js";

export function createRepeatCategoryBtn(category, categoryNode) {
    const repeatButton = document.createElement('button');
    repeatButton.classList.add('repeat-category-btn');
    repeatButton.innerHTML = `
            <svg class="repeat-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.45358 14C3.45358 8.70797 7.57891 3.45331 14.0002 3.45331C19.1858 3.45331 21.7506 7.29117 22.8426 9.33331H19.6002C19.3527 9.33331 19.1153 9.43164 18.9403 9.60667C18.7652 9.78171 18.6669 10.0191 18.6669 10.2666C18.6669 10.5142 18.7652 10.7516 18.9403 10.9266C19.1153 11.1016 19.3527 11.2 19.6002 11.2H25.2002C25.4478 11.2 25.6852 11.1016 25.8602 10.9266C26.0352 10.7516 26.1336 10.5142 26.1336 10.2666V4.66664C26.1336 4.4191 26.0352 4.18171 25.8602 4.00667C25.6852 3.83164 25.4478 3.73331 25.2002 3.73331C24.9527 3.73331 24.7153 3.83164 24.5403 4.00667C24.3652 4.18171 24.2669 4.4191 24.2669 4.66664V8.05091C22.9528 5.73251 19.9101 1.58664 14.0002 1.58664C6.41598 1.58664 1.58691 7.81197 1.58691 14C1.58691 20.188 6.41598 26.4133 14.0002 26.4133C17.629 26.4133 20.6493 24.976 22.7997 22.7882C23.9408 21.6244 24.8459 20.2508 25.4653 18.7432C25.5119 18.6298 25.5357 18.5084 25.5353 18.3858C25.535 18.2632 25.5105 18.1419 25.4632 18.0288C25.416 17.9157 25.347 17.813 25.26 17.7266C25.1731 17.6402 25.07 17.5717 24.9566 17.5252C24.8433 17.4786 24.7218 17.4548 24.5993 17.4552C24.4767 17.4555 24.3554 17.48 24.2423 17.5272C24.1292 17.5745 24.0265 17.6435 23.9401 17.7305C23.8537 17.8174 23.7852 17.9205 23.7386 18.0338C23.2112 19.318 22.4404 20.4881 21.4688 21.4797C19.6562 23.3277 17.1082 24.5466 14.0002 24.5466C7.57891 24.5466 3.45358 19.292 3.45358 14Z" fill="black"/>
            </svg>`
    repeatButton.addEventListener('click', () => {
        const storage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
        const currentSection = storage[window.location.hash.split('#/')[1]];
        delete currentSection[category.categoryName];
        localStorage.setItem('categoryQuizStorage', JSON.stringify(storage));
        updateCategoryStatus(category, categoryNode);
    });
    return repeatButton;
}
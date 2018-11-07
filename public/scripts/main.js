import {generateCustomOption, generateOptionText} from './util';

/**
 * This initiates the application
 */
function init(){
    const root = document.getElementById("app");

    const sale1 = generateOptionText('1', '100000', 'H1', 'A');
    const sale2 = generateOptionText('2', '100000', 'H2', 'B');
    const custSale = generateCustomOption();

    root.appendChild(sale1);
    root.appendChild(sale2);
    root.appendChild(custSale);
}

//Need to make sure the document is ready
document.addEventListener('DOMContentLoaded', () => {
    init();
});

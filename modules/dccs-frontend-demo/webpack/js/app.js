// Promise polyfills for Internet Explorer
// They adds about 20KB to vendor.js
import 'core-js/modules/es.promise'; // eslint-disable-line import/no-unassigned-import
import 'core-js/modules/es.array.iterator'; // eslint-disable-line import/no-unassigned-import

// Webcomponent polyfills add about 100 KB to vendor.js
import '@webcomponents/webcomponentsjs';

//Helper function
function register(name, component) {
  if (window.customElements.get(name) === undefined) {
    console.log('Registering ' + name);
    window.customElements.define(name, component);
  }
}

class HelloWorld extends HTMLElement {
  // Take care: connectedCallback could be called multiple times.
  // But for this simple examples it doesn't make a difference.
  connectedCallback() {
    console.log('Hello World is executed');
    import(	'./components/Hello/hello.js').then(module => {
      module.default(this);
    }).catch(error => console.error('An error occurred while loading the component `HelloWorld`', error));
  }
}
register('hello-world', HelloWorld);


/*
class Today extends HTMLElement {
  connectedCallback() {
    console.log('Today is executed');
    import('./components/Today/today.js').then(module => {
      module.default(this);
    }).catch(error => console.error('An error occurred while loading the component `Today`', error));
  }
}
register('app-today', Today);
*/
/*
 * This is an alternative approach without using webcomponents
 * Most of us have to support at least IE 11
 * This saves about 100 KB in dependencies
 */
const todayelements = document.getElementsByTagName("app-today");
if (todayelements.length > 0) {
    import('./components/Today/today.js').then(module => {
        for (let i = 0; i < todayelements.length; i++) {
            module.default(todayelements[i]);
          } 
      }).catch(error => console.error('An error occurred while loading the component `Today`', error));
}

class Shuffle extends HTMLElement {
  connectedCallback() {
    console.log('Shuffle is executed');
    import('./components/Shuffle/shuffle.js').then(module => {
      module.default(this);
    }).catch(error => console.error('An error occurred while loading the component `Shuffle`', error));
  }

  get words() {
    return this.getAttribute('words');
  }
}
register('app-shuffle', Shuffle);

/*
 * 1) Create 3 pages Hello World, Shuffle, Today
 * 2) Create 3 webcontents 
 *  a)<hello-world></hello-world>
 *  b)<app-shuffle></app-shuffle>
 *  c)<app-today></app-today>
 * 
 * Add the webcontents to the three pages (one per page)
 *  
 */



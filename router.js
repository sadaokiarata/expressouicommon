import crossroads from "crossroads";
import {Promise} from "es6-promise";

const scrollPositionsCache = {};

const currentUrl = () => window.location.pathname + window.location.search;

function alwaysArray(somethingOrArray) {
  return Array.isArray(somethingOrArray) ? somethingOrArray : somethingOrArray ? [somethingOrArray] : [];
}

function loadScrollPosition() {
  var scrollPosition = scrollPositionsCache[currentUrl()] || {x: 0, y: 0};
  window.scrollTo(scrollPosition.x, scrollPosition.y);
}

function saveScrollPosition() {
  scrollPositionsCache[currentUrl()] = {
    x: window.scrollX,
    y: window.scrollY
  };
}

const router = crossroads.create();
var nextActionModifier = {};

export default class Router {
  static set(routes, {prefix = ""} = {}) {
    this.prefixRe = new RegExp(`^${prefix}/`);

    alwaysArray(routes).forEach(routes => {
      var _default = routes.default;

      if (_default) {
        router.bypassed.add(() => {
          this.navigate(_default());
        });
      }

      Object.keys(routes).forEach((pattern) => {
        var handler = routes[pattern];
        router.addRoute(pattern, function() {
          saveScrollPosition();

          var {scroll = "zero", pushOrReplace = "pushState"} = nextActionModifier;
          nextActionModifier = {};

          var ret = handler(...arguments);
          Promise.resolve().then(() => {
            // Promissify ret.
            return ret;
          }).then(ret => {
            // If the return value is a String, it's considered as a redirect.
            if (typeof ret === "string") {
              this.navigate(ret);
              return;
            }
            // Otherwise, it's processed.
            var {state = {}, title = ""} = ret;
            if (typeof pushOrReplace === "string") {
              let url = `${prefix}${this.url}`;
              let newState = {url, ...state};
              history[pushOrReplace](newState, title, url);
            }

            if (scroll === "zero") {
              window.scrollTo(0, 0);
            } else if (scroll === "remember") {
              loadScrollPosition();
            }

            document.title = title;
          });
        }.bind(this));
      });
    });

    nextActionModifier = {pushOrReplace: "replaceState", scroll: "none"};
    this.navigate(currentUrl());
  }

  static navigate(url) {
    // If prefix is /foo and url is /foo/bar, this.url is /bar.
    this.url = url.replace(this.prefixRe, "/");
    router.parse(this.url);
  }
}

window.addEventListener("popstate", function(event) {
  event.preventDefault();
  window.popstateEvent = event;
  if (event.state) {
    nextActionModifier = {pushOrReplace: null, scroll: "remember"};
    Router.navigate(event.state.url);
  }
});

Router.routed = router.routed;
Router.rules = router.rules;

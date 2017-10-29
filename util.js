/**
 * Array
 */
export function applyFilters(array, filters) {
  return filters.reduce((array, filter) => array.filter(filter), array);
}

export function booleanHash(object, item) {
  object[item] = true;
  return object;
}

// One-level only array flattening.
export function flatten(memo, array) {
  memo.push(...array);
  return memo;
}

// http://stackoverflow.com/a/1885660/798133
export function intersection(a, b) {
  var _ = [];
  a = a.slice(0);
  b = b.slice(0);
  while(a.length > 0 && b.length > 0) {
    if (a[0] < b[0]) {
      a.shift();
    } else if (a[0] > b[0]) {
      b.shift();
    } else {
      // they're equal */
      _.push(a.shift());
      b.shift();
    }
  }
  return _;
}

// Returns slices of array of length n. For example:
// chunksSlice([1, 2, 3, 4, 5], 2)
// > [[1, 2], [3, 4], [5]]
export function chunksSlice(array, n) {
  if (n <= 0) {
    throw new Error("n must be positive");
  }
  var chunksLength = Math.ceil(array.length / n);
  return range(0, chunksLength).map(i => array.slice(n * i, n * (i + 1)));
}

export function range(start, end) {
  // Can't use the below because IE nor Opera supports .fill().
  // return new Array(end - start + 1).fill().map((_, key) => key + start);
  var array = [];
  var x = start;
  while (x <= end) {
    array.push(x++);
  }
  return array;
}

export function spreadSlice(array, n) {
  if (n <= 0) {
    return [];
  }
  if (n >= array.length) {
    return array;
  }
  if (n === 1) {
    let midpoint = Math.round(array.length / 2);
    return array.slice(midpoint, midpoint + 1);
  }
  // Return array with n items stepped in equal parts.
  var step = (array.length - 1) / (n - 1);
  return range(0, n - 1).map(i => array[Math.round(i * step)]);
}

export function unique(array) {
  var has = {};
  return array.reduce((memo, item) => {
    if (!has[item]) {
      has[item] = true;
      memo.push(item);
    }
    return memo;
  }, []);
}

/**
 * Object
 */
// Returns new deeply merged JSON.
//
// Eg.
// jsonDeepMerge({a: {b: 1, c: 2}}, {a: {b: 3, d: 4}})
// -> {a: {b: 3, c: 2, d: 4}}
//
// @arguments JSON's
//
function cloneArray(array) {
    return array.slice(0);
}

function cloneDate(date) {
    return new Date(date.getTime());
}

export function jsonDeepMerge(/* obj */) {
  var destination = {};
  var sources = [].slice.call(arguments, 0);
  sources.forEach(function (source) {
    var prop;
    for (prop in source) {
      if (Array.isArray(source[prop])) {
        // Clone and set arrays.
        destination[prop] = cloneArray(source[prop]);

      } else if (source[prop] instanceof Date) {
        // Clone and set dates.
        destination[prop] = cloneDate(source[prop]);

      } else if (typeof source[prop] === "object") {
        // Merge objects.
        destination[prop] = jsonDeepMerge({}, destination[prop], source[prop]);

      } else {
        // Set new values.
        destination[prop] = source[prop];
      }
    }
  });
  return destination;
}

/**
 * Cache
 */
const cached = {};
const cachedState = {};
export function cache(id, state, fn) {
  if (arguments.length === 2) {
    fn = state;
    state = null;
  }
  let _ = cached[id];
  if (_ && cachedState[id] === state) {
    return _;
  }
  cachedState[id] = state;
  return cached[id] = fn();
}

/**
 * Calmly (debounce)
 */
var calmlyCache = {};
export function calmly(fn, timeout = 400) {
  let id = fn.toString();
  if (calmlyCache[id]) {
    window.clearTimeout(calmlyCache[id]);
  }
  calmlyCache[id] = window.setTimeout(fn, timeout);
}

/**
 * DOM stuff
 */
// http://stackoverflow.com/a/7557433/798133
export function isElementInViewPort(rect) {
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function scrollIntoViewPort(element, {force = false, offset = {}} = {}) {
  var rect = element.getBoundingClientRect();
  if (!isElementInViewPort(rect) || force) {
    var offsetX = offset.x || 0;
    var offsetY = offset.y || 0;
    window.scrollTo(window.scrollX + rect.left + offsetX, window.scrollY + rect.top + offsetY);
  }
}

/**
 * localStorage
 */
export function localStorageGetItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function localStorageSetItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Number
 */
export function numberSorter(a, b) {
  return a - b;
}

/**
 * URL
 */
export function queryString(data = {}) {
  var pairs = Object.keys(data)
    .map(key => [key, data[key]])
    .filter(([key, value]) => value) // eslint-disable-line no-unused-vars
    .map(([key, value]) => [key, encodeURIComponent(value)]);
  return pairs.length ? `?${pairs.map(([key, value]) => `${key}=${value}`).join("&")}` : "";
}


import $ from "jquery";
import Fb from "facebook";
import {Promise} from "es6-promise";

const isRetina = window.devicePixelRatio > 1;

// TODO need to unset Authorization header in case of logout.
function setAjaxHeader(authResponse) {
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + authResponse.accessToken + "");
    }
  });
}

function augmentMe(authResponse) {
  return Promise.all([
    new Promise(function(resolve, reject) {
      Fb.api("/me", {fields: "email, first_name, name"}, function(response) {
        if (response.error) {
          return reject(response.error);
        }
        resolve(response);
      });
    }),
    new Promise(function(resolve, reject) {
      Fb.api(`/me/picture?${isRetina ? "width=64&height=64" : "width=32&height=32"}`, function(response) {
        if (response.error) {
          reject(response.error);
        }
        resolve(response.data);
      });
    })
  ])
    .then(function([me, picture]) {
      me.authResponse = authResponse;
      me.picture = picture;
      return me;
    });
}

export default class User {
  static getLoginStatus () {
    return new Promise(function(resolve) {
      Fb.getLoginStatus(resolve);
    })
    .then(this.handleLoginResponse.bind(this));
  }

  static handleLoginResponse(response) {
    var {status, authResponse} = response;
    if (status !== "connected") {
      return;
    }
    setAjaxHeader(authResponse);
    return augmentMe(authResponse);
  }

  static login() {
    return new Promise(function(resolve) {
      Fb.login(resolve, {scope: "email"});
    })
    .then(this.handleLoginResponse.bind(this));
  }

  static logout() {
    return new Promise(function(resolve, reject) {
      Fb.logout(function(response) {
        if (response.error) {
          return reject(response.error);
        }
        resolve();
      });
    });
  }
}

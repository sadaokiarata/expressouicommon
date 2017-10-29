"use strict";

require("babel-core/register");

global.expect = require("chai").expect;
global.shallow = require("enzyme").shallow;
global.NODE_ENV = "development";

var Globalize = require("globalize");
Globalize.load(
  require("cldr-data").entireSupplemental(),
  require("cldr-data").entireMainFor("en")
);
Globalize.loadMessages({
  en: {
    "just now": "just now"
  }
});
Globalize.locale("en");

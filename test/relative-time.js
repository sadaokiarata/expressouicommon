import RelativeTime from "../relative-time";
import React from "react";
import sinon from "sinon";

describe("relative-time", function() {
  var clock, element;

  beforeEach(function() {
    clock = sinon.useFakeTimers(new Date("2016-04-10 12:00:00").getTime());
  });

  afterEach(function() {
    clock.restore();
  });

  // Keep relative-time tests in its respective library.
  it("should work", function() {
    element = shallow(<RelativeTime>{new Date("2016-04-10 12:00:00")}</RelativeTime>);
    expect(element.text()).to.equal("now");
    element = shallow(<RelativeTime>{new Date("2016-04-10 12:01")}</RelativeTime>);
    expect(element.text()).to.equal("in 1 minute");
  });
});

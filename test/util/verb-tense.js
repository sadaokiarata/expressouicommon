import verbTense from "../../util/verb-tense";
import sinon from "sinon";

describe("util/verb-tense", function() {
  var clock;

  before(function() {
    clock = sinon.useFakeTimers(new Date("2016-04-10 12:00").getTime());
  });

  after(function() {
    clock.restore();
  });

  it("should work", function() {
    expect(verbTense(new Date("2016-04-10 09:00"))).to.equal("present");
    expect(verbTense(new Date("2016-04-10 12:00"))).to.equal("present");
    expect(verbTense(new Date("2016-04-10 18:00"))).to.equal("future");
    expect(verbTense(new Date("2016-04-09 18:00"))).to.equal("past");
  });
});

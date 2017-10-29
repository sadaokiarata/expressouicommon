import $ from "jquery";
import classnames from "classnames";
import React, {Component} from "react";

var popoverSeq = 0;

export default class Popover extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  componentWillMount() {
    this.id = ++popoverSeq;
  }

  componentDidMount() {
    const {id} = this;
    $(document).on({
      [`click.Popover${id}`]: (event) => {
        if ($(event.target).closest(this.button).length) {
          this.setState({ isOpen: !this.state.isOpen });
        } else if ($(event.target).closest(this.popover).length) {
          this.setState({ isOpen: true });
        } else {
          this.setState({ isOpen: false });
        }
      },
      [`keydown.Popover${id}`]: (event) => {
        // Escape
        if (this.state.isOpen && event.keyCode === 27) {
          this.setState({ isOpen: false });
        }
        // Cursor down
        if (document.activeElement === this.button && !this.state.isOpen && event.keyCode === 40) {
          this.setState({ isOpen: true });
        }
      }
    });
  }

  componentWillUnmount() {
    $(document).off(`.Popover${this.id}`);
  }

  closePopover() {
    this.setState({isOpen: false});
  }

  render() {
    const {id} = this;
    const {isOpen} = this.state;
    const {buttonClass, buttonContent, children} = this.props;
    return (
      <div className={`Popover${id}`}>
        <button type="button" className={classnames("body-button", isOpen && "--pressed", buttonClass)} ref={ref => this.button = ref}>
          {buttonContent}
        </button>
        {isOpen && <div ref={ref => this.popover = ref}>{children}</div>}
      </div>
    );
  }
}


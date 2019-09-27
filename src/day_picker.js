import React from "react";
import styled from "styled-components";
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { CustomRangeSelect } from "./custom_range_select";
import { CUSTOM_RANGES, getDates } from "./utils";

const Popover = styled.div`
  position: absolute;
  z-index: 3;
  top: 30px;
  border: 1px solid black;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const WrapperContent = styled.div`
  position: relative;
  z-index: 4;
`;

const DayPickerContainer = styled(DayPicker)`
  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .DayPicker-Day {
    border-radius: 0 !important;
  }
`;

export class UIDayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: props.defaultFrom,
      to: props.defaultTo,
      enteredTo: props.defaultTo,
      customRange: ""
    };

    this.dayPickerContainerRef = React.createRef();
  }

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  handleDayClick = day => {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
        customRange: ""
      });
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
        customRange: ""
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
        customRange: ""
      });
    }
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
        customRange: ""
      });
    }
  };

  handleUpdate = () => {
    this.props.onUpdateRange({
      from: this.state.from,
      to: this.state.to
    });
  };

  resetDates = () => {
    this.setState(
      {
        from: this.props.defaultFrom,
        to: this.props.defaultTo,
        enteredTo: this.props.defaultTo,
        customRange: ""
      },
      () => {
        this.navigateToCurrentMonth(this.state.to);
      }
    );
  };

  navigateToCurrentMonth = to => {
    const navigateTo = moment(to)
      .subtract(2, "months")
      .toDate();
    this.dayPickerContainerRef.current.showMonth(navigateTo);
  };

  updateDates = ({ from, to }) => {
    this.setState(
      {
        from,
        to,
        enteredTo: to
      },
      () => {
        this.navigateToCurrentMonth(this.state.to);
      }
    );
  };

  updateCustomRange = event => {
    if (event.target.value) {
      const { type, days } = CUSTOM_RANGES[event.target.value];
      const { from, to } = getDates({ type, days });
      this.updateDates({ from, to });
    }

    this.setState({
      customRange: event.target.value
    });
  };

  render() {
    const { from, to, enteredTo, customRange } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { after: new Date() };
    const selectedDays = [from, { from, to: enteredTo }];
    const positionMonths = {
      initialMonth: this.props.inputsFocus.from
        ? from
        : this.props.inputsFocus.to
        ? to
        : new Date(),
      toMonth: new Date()
    };
    return (
      <Popover>
        <Cover onClick={this.props.hideDayPicker} />
        <WrapperContent>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomRangeSelect
                value={customRange}
                onChange={this.updateCustomRange}
              />
              <div>
                <button type="button" onClick={this.resetDates}>
                  Reset
                </button>
                <button type="button" onClick={this.handleUpdate}>
                  Ok
                </button>
              </div>
            </div>
          </div>
          <DayPickerContainer
            numberOfMonths={3}
            {...positionMonths}
            selectedDays={selectedDays}
            disabledDays={disabledDays}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            ref={this.dayPickerContainerRef}
          />
        </WrapperContent>
      </Popover>
    );
  }
}

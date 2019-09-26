import React from "react";
import styled from "styled-components";
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

const Popover = styled.div`
  position: absolute;
  z-index: 3;
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
  display: flex;
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
      enteredTo: props.defaultTo
    };
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
        enteredTo: null
      });
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day
      });
    }
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  };

  handleUpdate = () => {
    this.props.onUpdateRange({
      from: this.state.from,
      to: this.state.to
    });
  };

  reset = () => {
    this.setState({
      from: this.props.defaultFrom,
      to: this.props.defaultTo,
      enteredTo: this.props.defaultTo
    });
  };

  updateLastDays = days => () => {
    const from = moment()
      .subtract(days - 1, "days")
      .toDate();
    const to = moment().toDate();
    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  updateCurrentMonth = () => {
    const from = moment()
      .startOf("month")
      .toDate();
    const to = moment().toDate();
    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  updatePreviousMonth = () => {
    const from = moment()
      .subtract(1, "months")
      .startOf("month")
      .toDate();
    const to = moment()
      .subtract(1, "months")
      .endOf("month")
      .toDate();

    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  updateCurrentQuater = () => {
    const from = moment()
      .startOf("quarter")
      .toDate();
    const to = moment().toDate();

    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  updatePreviousQuater = () => {
    const from = moment()
      .subtract(1, "quarter")
      .startOf("quarter")
      .toDate();
    const to = moment()
      .subtract(1, "quarter")
      .endOf("quarter")
      .toDate();

    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  updateCurrentYear = () => {
    const from = moment()
      .startOf("year")
      .toDate();

    this.setState({
      from
    });
  };

  updateAllTime = () => {
    const from = moment("01/01/2010", "M-D-Y").toDate();
    const to = moment().toDate();

    this.setState({
      from,
      to,
      enteredTo: to
    });
  };

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { after: new Date() };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <Popover>
        <Cover onClick={this.props.hideDayPicker} />
        <WrapperContent>
          <div>
            <div>
              <button type="button" onClick={this.updateLastDays(7)}>
                Last 7 days
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateLastDays(14)}>
                Last 14 days
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateLastDays(30)}>
                Last 30 days
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateLastDays(90)}>
                Last 90 days
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateCurrentMonth}>
                Current month
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updatePreviousMonth}>
                Previous month
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateCurrentQuater}>
                Current quater
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updatePreviousQuater}>
                Previous quater
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateCurrentYear}>
                Current year
              </button>
            </div>
            <div>
              <button type="button" onClick={this.updateAllTime}>
                All time
              </button>
            </div>
          </div>
          <DayPickerContainer
            numberOfMonths={3}
            toMonth={to}
            selectedDays={selectedDays}
            disabledDays={disabledDays}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
          />
          <div>
            <div>
              <button type="button" onClick={this.handleUpdate}>
                Ok
              </button>
            </div>
            <div>
              <button type="button" onClick={this.reset}>
                Reset
              </button>
            </div>
          </div>
        </WrapperContent>
      </Popover>
    );
  }
}

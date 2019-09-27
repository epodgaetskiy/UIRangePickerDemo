import React from "react";
import moment from "moment";
import styled, { css } from "styled-components";
import { UIDayPicker } from "./day_picker";

const Wrapper = styled.div`
  position: relative;
  z-index: 3;
`;

const Input = styled.input`
  position: relative;
  z-index: 4;
  ${({ error }) =>
    error &&
    css`
      border-color: red;
    `}
`;

const defaultFrom = "09/15/2019";
const defaultTo = "09/26/2019";

export class UIRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDayPicker: false,
      dates: {
        from: moment(defaultFrom, "MM/DD/YYYY"),
        to: moment(defaultTo, "MM/DD/YYYY")
      },
      inputs: {
        values: {
          from: moment(defaultFrom, "MM/DD/YYYY").format("l"),
          to: moment(defaultTo, "MM/DD/YYYY").format("l")
        },
        errors: {},
        focus: {
          from: false,
          to: false
        }
      }
    };

    this.dayPickerRef = React.createRef();
  }

  showDayPicker = () => {
    this.setState({
      showDayPicker: true
    });
  };

  hideDayPicker = () => {
    this.setState({
      showDayPicker: false
    });
  };

  onChangeInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(
      state => ({
        inputs: {
          ...state.inputs,
          values: {
            ...state.inputs.values,
            [key]: value
          }
        }
      }),
      () => {
        const date = moment(this.state.inputs.values[key], "M/D/YYYY", true);
        if (date.isValid()) {
          this.setState(state => ({
            dates: {
              ...state.dates,
              [key]: date
            },
            inputs: {
              ...state.inputs,
              errors: {}
            }
          }));
        } else {
          this.setState(state => ({
            inputs: {
              ...state.inputs,
              errors: {
                [key]: true
              }
            }
          }));
        }
      }
    );
  };

  onUpdateRange = ({ from, to }) => {
    this.setState({
      dates: {
        from: moment(from),
        to: moment(to)
      },
      inputs: {
        values: {
          from: moment(from).format("l"),
          to: moment(to).format("l")
        },
        errors: {}
      }
    });
    this.hideDayPicker();
  };

  onFocusInput = event => {
    const name = event.target.name;
    if (this.state.showDayPicker) {
      this.dayPickerRef.current.resetDates();
    }

    this.setState(
      state => ({
        inputs: {
          ...state.inputs,
          focus: {
            [name]: true
          }
        }
      }),
      () => {
        if (this.state.showDayPicker) {
          this.dayPickerRef.current.navigateToCurrentMonth(
            this.state.dates[name].toDate()
          );
        } else {
          this.showDayPicker();
        }
      }
    );
  };

  onBlurInput = () => {
    this.setState(state => ({
      inputs: {
        ...state.inputs,
        focus: {
          to: false,
          from: false
        }
      }
    }));
  };

  render() {
    const { dates, inputs, showDayPicker } = this.state;
    return (
      <Wrapper>
        <Input
          name="from"
          value={inputs.values.from}
          onChange={this.onChangeInput}
          error={inputs.errors.from}
          onFocus={this.onFocusInput}
          onBlur={this.onBlurInput}
        />
        <Input
          name="to"
          value={inputs.values.to}
          onChange={this.onChangeInput}
          error={inputs.errors.to}
          onFocus={this.onFocusInput}
          onBlur={this.onBlurInput}
        />
        {showDayPicker && (
          <UIDayPicker
            key={`${dates.from}${dates.to}`}
            defaultFrom={dates.from ? dates.from.toDate() : dates.from}
            defaultTo={dates.to ? dates.to.toDate() : dates.to}
            onUpdateRange={this.onUpdateRange}
            hideDayPicker={this.hideDayPicker}
            inputsFocus={inputs.focus}
            ref={this.dayPickerRef}
          />
        )}
      </Wrapper>
    );
  }
}

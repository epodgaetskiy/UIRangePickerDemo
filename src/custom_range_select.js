import React from "react";
import { CUSTOM_RANGES } from "./utils";

export const CustomRangeSelect = React.memo(({ value, onChange }) => (
  <select value={value} onChange={onChange}>
    <option value="">Choose custom range</option>
    {CUSTOM_RANGES.map(({ name }, index) => (
      <option key={index} value={String(index)}>
        {name}
      </option>
    ))}
  </select>
));

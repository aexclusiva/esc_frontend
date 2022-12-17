import React, { useEffect, useState } from "react";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";

export interface StayDatesRangeInputProps {
  defaultValue: DateRage;
  onChange?: (data: DateRage) => void;
  className?: string;
  fieldClassName?: string;
  wrapClassName?: string;
  numberOfMonths?: number;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding--small ]",
  wrapClassName = "divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0 md:border-l md:border-r border-neutral-200 dark:border-neutral-700 lg:border-none",
  numberOfMonths,
  className = "",
}) => {
  return (
<></>
  );
};

export default StayDatesRangeInput;

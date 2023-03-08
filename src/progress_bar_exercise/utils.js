
import { HANGING_BREAKPOINT } from "./constants";

export const getBreakpoints = (values) => {
   return values
    .replace(" ", "")
    .split(",")
    .map((value) => parseInt(value, 10))
    .filter((value) => value > 0 && value < HANGING_BREAKPOINT)
    .sort((a, b) => a - b);
}
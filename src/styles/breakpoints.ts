const getBreakpoint = (breakpoint: number) =>
  `@media (min-width: ${breakpoint}px)`

export const breakpoints = {
  desktop: getBreakpoint(1000),
}

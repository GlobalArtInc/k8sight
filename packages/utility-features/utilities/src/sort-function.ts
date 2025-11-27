/**
 * Get an ordering function based on the function getter
 */
export function byValue<T>(getOrderValue: (src: T) => number): (left: T, right: T) => number {
  return (left, right) => {
    const leftValue = getOrderValue(left);
    const rightValue = getOrderValue(right);

    return leftValue - rightValue;
  };
}

export function getCurrency(countryCode: string): string {
  switch (countryCode) {
    case "SWZ":
      return "E";
    case "SA":
      return "R";
    case "MZ":
      return "MT";
    default:
      return "";
  }
}

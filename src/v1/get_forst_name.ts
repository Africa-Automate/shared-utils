export function getFirstName(fullName: string): string {
  if (fullName == null) return "";

  const parts = fullName.split(", ");

  if (parts.length == 1) return parts[0];

  const names = parts[1].split(" ");
  const firstName = names[0];

  return firstName;
}

type Field = "card" | "deck" | "folder" | "user";

const fieldsMap: Record<Field, [string, string]> = {
  card: ["card", "cards"],
  deck: ["deck", "decks"],
  folder: ["folder", "folders"],
  user: ["user", "users"],
};

export function countOf(value: number, field: Field): string {
  return `${value} ${value === 1 ? fieldsMap[field][0] : fieldsMap[field][1]}`;
}

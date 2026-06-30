/**
 * Builds the canonical section label from DB data.
 * DB sections store `name` as "4to B" and `level` as "secundaria".
 * The rest of the app uses the combined label "4to B - Secundaria".
 *
 * Seeds (studentRoster, grades, attendance) store this full label
 * in the student's `section` field.
 */
export function buildSectionLabel(name: string, level: "primaria" | "secundaria"): string {
  return `${name} - ${level === "secundaria" ? "Secundaria" : "Primaria"}`
}

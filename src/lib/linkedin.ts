import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import type { Experience } from "src/constants/experience";

// ─── CSV parsing ──────────────────────────────────────────────────────────────
// LinkedIn exports Positions.csv with the following columns:
// "Company Name","Title","Description","Location","Started On","Finished On"

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function formatPeriod(startedOn: string, finishedOn: string): string {
  if (!startedOn) return "";
  const start = startedOn.trim();
  const end = finishedOn?.trim();
  // Convert "Jan 2023" → "2023", "Mar 2021" → "2021" (year only for cleaner display)
  const startYear = start.split(" ").pop() ?? start;
  if (!end) return `${startYear} - Present`;
  const endYear = end.split(" ").pop() ?? end;
  return `${startYear} - ${endYear}`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function loadLinkedInExperiences(): Experience[] | null {
  const csvPath = resolve(process.cwd(), "src/data/Positions.csv");

  if (!existsSync(csvPath)) {
    return null;
  }

  try {
    const raw = readFileSync(csvPath, "utf-8");
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);

    if (lines.length < 2) return null;

    // First line is the header — skip it
    const dataLines = lines.slice(1);

    const experiences: Experience[] = dataLines
      .map((line, index): Experience | null => {
        const [company, title, , , startedOn, finishedOn] =
          parseCSVLine(line);

        if (!company || !title) return null;

        return {
          id: String(index + 1),
          key: (company || "").toLowerCase().replace(/[^a-z0-9]+/g, "_"),
          company: company || "",
          role: title || "",
          period: formatPeriod(startedOn, finishedOn),
          technologies: [],
          // Technologies aren't in the LinkedIn export — they stay empty here.
          // You can enrich them manually in experience.ts after the first import.
        };
      })
      .filter((e): e is Experience => e !== null)
      // Sort chronologically: "Present" first, then most recent
      .sort((a, b) => {
        const aPresent = a.period.includes("Present") ? 1 : 0;
        const bPresent = b.period.includes("Present") ? 1 : 0;
        if (aPresent !== bPresent) return bPresent - aPresent;
        const aYear = parseInt(a.period.split(" - ")[0]) || 0;
        const bYear = parseInt(b.period.split(" - ")[0]) || 0;
        return bYear - aYear;
      });

    return experiences.length > 0 ? experiences : null;
  } catch (err) {
    console.error("[LinkedIn] Failed to parse Positions.csv:", err);
    return null;
  }
}

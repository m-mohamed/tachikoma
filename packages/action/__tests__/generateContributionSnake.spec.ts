import * as fs from "fs";
import * as path from "path";
import { it, expect } from "bun:test";
import { generateContributionSnake } from "../generateContributionSnake";
import { parseOutputsOption } from "../outputsOptions";

const silent = (handler: () => void | Promise<void>) => async () => {
  const originalConsoleLog = console.log;
  console.log = () => undefined;
  try {
    return await handler();
  } finally {
    console.log = originalConsoleLog;
  }
};

const createFixture = () => ({
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: Array.from({ length: 53 }, (_, x) => ({
            contributionDays: Array.from({ length: 7 }, (_, y) => ({
              contributionCount: x + y,
              contributionLevel: (
                [
                  "NONE",
                  "FIRST_QUARTILE",
                  "SECOND_QUARTILE",
                  "THIRD_QUARTILE",
                  "FOURTH_QUARTILE",
                ] as const
              )[(x + y) % 5],
              weekday: y,
              date: `2026-01-${String(((x * 7 + y) % 28) + 1).padStart(2, "0")}`,
            })),
          })),
        },
      },
    },
  },
});

it(
  "should generate contribution snake",
  silent(async () => {
    const originalFetch = globalThis.fetch;
    try {
      const entries = [
        path.join(__dirname, "__snapshots__/out.svg"),

        path.join(__dirname, "__snapshots__/out-dark.svg") +
          "?palette=github-dark&color_snake=orange",

        path.join(__dirname, "__snapshots__/out.gif") +
          "?color_snake=orange&color_dots=#d4e0f0,#8dbdff,#64a1f4,#4b91f1,#3c7dd9",
      ];

      const outputs = parseOutputsOption(entries);

      globalThis.fetch = (async () =>
        new Response(JSON.stringify(createFixture()), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })) as unknown as typeof fetch;

      const results = await generateContributionSnake("platane", outputs, {
        githubToken: "test-token",
      });

      expect(results[0]).toBeDefined();
      expect(results[1]).toBeDefined();
      expect(results[2]).toBeDefined();

      fs.writeFileSync(outputs[0]!.filename, results[0]!);
      fs.writeFileSync(outputs[1]!.filename, results[1]!);
      fs.writeFileSync(outputs[2]!.filename, results[2]!);
    } finally {
      globalThis.fetch = originalFetch;
    }
  }),
  { timeout: 2 * 60 * 1000 },
);

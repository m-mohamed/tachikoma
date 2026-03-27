import { getGithubUserContribution } from "..";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";

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

describe("getGithubUserContribution", () => {
  const originalFetch = globalThis.fetch;
  let promise: ReturnType<typeof getGithubUserContribution>;

  beforeAll(() => {
    globalThis.fetch = (async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => {
      expect(input).toBe("https://api.github.com/graphql");
      expect(init?.method).toBe("POST");

      return new Response(JSON.stringify(createFixture()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as unknown as typeof fetch;

    promise = getGithubUserContribution("platane", {
      githubToken: "test-token",
    });
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it("should resolve", async () => {
    await promise;
  });

  it("should get around 365 cells", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThanOrEqual(365);
    expect(cells.length).toBeLessThanOrEqual(365 + 7);
  });

  it("cells should have x / y coords representing to a 7 x (365/7) (minus unfilled last row)", async () => {
    const cells = await promise;

    expect(cells.length).toBeGreaterThan(300);

    const undefinedDays = Array.from({ length: Math.floor(365 / 7) })
      .map((x) => Array.from({ length: 7 }).map((y) => ({ x, y })))
      .flat()
      .filter(({ x, y }) => cells.some((c: any) => c.x === x && c.y === y));

    expect(undefinedDays).toEqual([]);
  });

  it("should map contribution levels to numeric values", async () => {
    const cells = await promise;

    expect(cells[0]?.level).toBe(0);
    expect(cells[1]?.level).toBe(1);
    expect(cells[2]?.level).toBe(2);
    expect(cells[3]?.level).toBe(3);
    expect(cells[4]?.level).toBe(4);
  });
});

const liveIt =
  process.env.ENABLE_GITHUB_INTEGRATION_TESTS === "1" &&
  process.env.GITHUB_TOKEN
    ? it
    : it.skip;

describe("getGithubUserContribution integration", () => {
  liveIt(
    "should resolve against the live GitHub API when explicitly enabled",
    async () => {
      const cells = await getGithubUserContribution("platane", {
        githubToken: process.env.GITHUB_TOKEN!,
      });

      expect(cells.length).toBeGreaterThanOrEqual(365);
      expect(cells.length).toBeLessThanOrEqual(365 + 7);
    },
  );
});

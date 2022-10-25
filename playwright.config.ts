import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const CI = !!process.env.CI;

const config: PlaywrightTestConfig = {
    reporter: "list",
    fullyParallel: !CI,
    maxFailures: CI ? 5 : undefined,
    timeout: CI ? 10000 : 30000,
    retries: CI ? 3 : 0,
    testMatch: "**/*.spec.ts",
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
};

export default config;

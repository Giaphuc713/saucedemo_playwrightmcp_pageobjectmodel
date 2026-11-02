export type TestEnvironment = 'dev' | 'uat' | 'stage';

const environment = process.env.TEST_ENV ?? 'dev';

console.log(`Running tests in ${environment} environment`);

if (!['dev', 'uat', 'stage'].includes(environment)) {
    throw new Error(`Invalid TEST_ENV: ${environment}. Expected dev or uat.`);
}

export const testEnvironment = environment as TestEnvironment;

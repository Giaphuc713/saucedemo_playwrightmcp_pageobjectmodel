import { testEnvironment } from "@config/environment";

type RequestDemoData = {
    email: string;
    company: string;
    usecase: string;
    comment: string;
};

const requestDemoData: Record<'dev' | 'uat', RequestDemoData> = {
    dev: {
        email: 'Phucha2639@gmail.com',
        company: 'Google',
        usecase: 'AI Test Authoring ',
        comment: 'Test Request Demo Dev',
    },
    uat: {
        email: 'Phucha2739@gmail.com',
        company: 'Google',
        usecase: 'Parallel Test Execution & CI/CD Integration ',
        comment: 'Test Request Demo Uat',
    },
};

export const requestDemoTestData = requestDemoData[testEnvironment];
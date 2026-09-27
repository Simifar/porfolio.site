module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/work/taskfocus/',
        'http://localhost/work/mindtrack/',
      ],
      numberOfRuns: 2,
      settings: { chromeFlags: '--no-sandbox' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3500, aggregationMethod: 'optimistic' }],
        'total-blocking-time': ['error', { maxNumericValue: 300, aggregationMethod: 'optimistic' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'optimistic' }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci/reports' },
  },
};

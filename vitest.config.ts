import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  // TC39 decorators：Vite 8/oxc 尚未支持降级；锁定 vite@7 并用 esbuild 处理
  esbuild: { target: 'es2022' },
  test: {
    // 与主仓包内测试布局一致；暂无子包时允许空跑
    include: ['packages/*/test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['packages/*/src/**/*.{ts,js,mjs,cjs}'],
      exclude: ['**/coverage/**', '**/.DS_Store'],
      reporter: ['html', 'lcovonly', 'text-summary'],
    },
    exclude: [...configDefaults.exclude, '**/dist/**'],
    maxConcurrency: 1,
    fileParallelism: false,
    maxWorkers: 1,
    clearMocks: false,
    logHeapUsage: true,
    environment: 'node',
    retry: 1,
    testTimeout: 15_000,
    globals: true,
    passWithNoTests: true,
    snapshotFormat: {
      escapeString: false,
      printBasicPrototype: false,
    },
    globalSetup: 'vitest.setup.ts',
    watch: false,
  },
});

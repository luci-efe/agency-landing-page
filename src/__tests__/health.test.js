/**
 * Infrastructure health checks for CI/CD pipeline
 */
/* eslint-disable @typescript-eslint/no-require-imports */

describe('Infrastructure Health Checks', () => {
  describe('Environment Configuration', () => {
    test('should have valid Node.js environment', () => {
      expect(process.version).toMatch(/^v\d+\.\d+\.\d+/);
      expect(process.platform).toBeDefined();
    });

    test('should handle NODE_ENV correctly', () => {
      const nodeEnv = process.env.NODE_ENV;
      if (nodeEnv) {
        expect(['development', 'test', 'production']).toContain(nodeEnv);
      }
    });
  });

  describe('Project Configuration', () => {
    test('should have valid package.json structure', () => {
      const packageJson = require('../../package.json');
      
      expect(packageJson.name).toBe('agency-landing-page');
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.devDependencies).toBeDefined();
    });

    test('should have required build scripts', () => {
      const packageJson = require('../../package.json');
      const requiredScripts = ['build', 'dev', 'lint', 'typecheck', 'test'];
      
      requiredScripts.forEach(script => {
        expect(packageJson.scripts[script]).toBeDefined();
      });
    });
  });

  describe('Dependencies Validation', () => {
    test('should have Next.js as primary framework', () => {
      const packageJson = require('../../package.json');
      expect(packageJson.dependencies.next).toBeDefined();
      expect(packageJson.dependencies.react).toBeDefined();
      expect(packageJson.dependencies['react-dom']).toBeDefined();
    });

    test('should have testing dependencies configured', () => {
      const packageJson = require('../../package.json');
      expect(packageJson.devDependencies.jest).toBeDefined();
      expect(packageJson.devDependencies['@testing-library/react']).toBeDefined();
      expect(packageJson.devDependencies.cypress).toBeDefined();
    });
  });
});
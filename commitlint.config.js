/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  
  // Custom rules for our project
  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'test',     // Adding or updating tests
        'chore',    // Maintenance tasks
        'ci',       // CI/CD changes
        'perf',     // Performance improvements
        'build',    // Build system changes
        'revert'    // Revert previous commit
      ]
    ],
    
    // Scope enum - allowed scopes for our project
    'scope-enum': [
      2,
      'always',
      [
        'auth',       // Authentication related
        'api',        // API changes
        'ui',         // User interface
        'components', // React/Astro components
        'pages',      // Page components
        'layout',     // Layout components
        'config',     // Configuration files
        'deps',       // Dependencies
        'chat',       // Chat widget/functionality
        'firebase',   // Firebase related
        'styles',     // Styling/CSS
        'build',      // Build configuration
        'ci',         // CI/CD configuration
        'docs',       // Documentation
        'test'        // Test files
      ]
    ],
    
    // Subject (description) rules
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50],
    'subject-min-length': [2, 'always', 10],
    
    // Type rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    
    // Scope rules
    'scope-case': [2, 'always', 'lower-case'],
    
    // Header rules
    'header-max-length': [2, 'always', 72],
    'header-min-length': [2, 'always', 15],
    
    // Body rules
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    
    // References (issue numbers, etc.)
    'references-empty': [1, 'never']
  },
  
  // Custom message format
  prompt: {
    questions: {
      type: {
        description: 'Wähle den Typ der Änderung:',
        enum: {
          feat: {
            description: '✨ Neue Funktion',
            title: 'Features'
          },
          fix: {
            description: '🐛 Bug-Fix',
            title: 'Bug Fixes'
          },
          docs: {
            description: '📚 Dokumentation',
            title: 'Documentation'
          },
          style: {
            description: '💎 Code-Stil/Formatierung',
            title: 'Styles'
          },
          refactor: {
            description: '📦 Code-Refactoring',
            title: 'Code Refactoring'
          },
          test: {
            description: '🚨 Tests hinzufügen/ändern',
            title: 'Tests'
          },
          chore: {
            description: '♻️ Maintenance-Aufgaben',
            title: 'Chores'
          },
          ci: {
            description: '⚙️ CI/CD Änderungen',
            title: 'Continuous Integrations'
          },
          perf: {
            description: '🚀 Performance-Verbesserung',
            title: 'Performance Improvements'
          },
          build: {
            description: '🛠️ Build-System',
            title: 'Builds'
          },
          revert: {
            description: '🗑️ Commit rückgängig machen',
            title: 'Reverts'
          }
        }
      },
      scope: {
        description: 'Scope der Änderung (optional):'
      },
      subject: {
        description: 'Kurze Beschreibung der Änderung:'
      },
      body: {
        description: 'Ausführliche Beschreibung (optional):'
      },
      isBreaking: {
        description: 'Sind das Breaking Changes?'
      },
      breakingBody: {
        description: 'Breaking Changes Beschreibung:'
      },
      breaking: {
        description: 'Breaking Changes Details:'
      },
      isIssueAffected: {
        description: 'Betrifft diese Änderung offene Issues?'
      },
      issuesBody: {
        description: 'Falls Issues betroffen sind, füge eine neue Zeile hinzu:'
      },
      issues: {
        description: 'Issue-Referenzen (z.B. "fix #123", "re #123"):'
      }
    }
  }
};
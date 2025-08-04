# Contributing Guidelines

## Git Commit Standards

Dieses Projekt folgt den [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) Standards für alle Commit-Nachrichten.

## Setup

1. **Dependencies installieren:**
   ```bash
   npm install
   ```

2. **Git Hooks aktivieren:**
   ```bash
   npm run prepare
   ```

3. **Git Commit Template setzen:**
   ```bash
   git config commit.template .gitmessage
   ```

## Commit Message Format

### Standard Format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types:

| Type       | Beschreibung                                    | SemVer |
|------------|------------------------------------------------|--------|
| `feat`     | ✨ Neue Funktion                               | MINOR  |
| `fix`      | 🐛 Bug-Fix                                     | PATCH  |
| `docs`     | 📚 Dokumentationsänderungen                   | -      |
| `style`    | 💎 Code-Stil (Formatierung, Leerzeichen)      | -      |
| `refactor` | 📦 Code-Refactoring                           | -      |
| `test`     | 🚨 Tests hinzufügen/ändern                    | -      |
| `chore`    | ♻️ Maintenance (Build, Dependencies)          | -      |
| `ci`       | ⚙️ CI/CD Konfiguration                        | -      |
| `perf`     | 🚀 Performance-Verbesserung                   | PATCH  |
| `build`    | 🛠️ Build-System Änderungen                    | -      |
| `revert`   | 🗑️ Commit rückgängig machen                   | -      |

### Scopes (optional):

- `auth` - Authentication/Authorization
- `api` - API Änderungen  
- `ui` - User Interface
- `components` - React/Astro Komponenten
- `pages` - Seiten-Komponenten
- `layout` - Layout-Komponenten
- `config` - Konfigurationsdateien
- `deps` - Dependencies
- `chat` - Chat Widget/Funktionalität
- `firebase` - Firebase Integration
- `styles` - CSS/Styling
- `build` - Build-Konfiguration
- `ci` - CI/CD Konfiguration
- `docs` - Dokumentation
- `test` - Test-Dateien

## Commit-Methoden

### 1. Interaktiver Commit (empfohlen)
```bash
npm run commit
```
Dies startet einen interaktiven Wizard, der dich durch die Commit-Erstellung führt.

### 2. Manueller Commit
```bash
git commit
```
Das Git-Template wird automatisch geladen mit Hilfen und Beispielen.

### 3. Direkter Commit
```bash
git commit -m "feat(auth): add OAuth2 login support"
```

## Beispiele

### Feature hinzufügen:
```
feat(auth): add OAuth2 login support

Implement OAuth2 authentication flow with Google and GitHub providers.
Includes login, logout, and token refresh functionality.

Closes #123
```

### Bug-Fix:
```
fix(chat): resolve memory leak in profile component

The ProfileEditor component was not properly cleaning up event listeners
when unmounted, causing memory leaks during navigation.
```

### Breaking Change:
```
feat!: remove deprecated user API

BREAKING CHANGE: The old user API endpoints (/api/user/*) have been 
removed. Use the new endpoints under /api/users/* instead.

Migration guide: https://docs.example.com/migration
```

### Dokumentation:
```
docs: update API documentation for new endpoints

Add documentation for OAuth2 endpoints and update authentication
examples in the getting started guide.
```

## Tools & Extensions

### VS Code/Cursor Extensions:
- **Conventional Commits**: Auto-Completion für Commit Types
- **GitLens**: Git History und Blame Annotations
- **Git Graph**: Visualisierung der Git History

## Automatisierung

Das Projekt nutzt Conventional Commits für:

1. **Semantic Versioning**: Automatische Versionsnummern basierend auf Commit Types
2. **Changelog**: Automatische Generierung von Release Notes
3. **Release Process**: Automatische Releases bei Breaking Changes oder Features
4. **Documentation**: Automatische Aktualisierung der API-Dokumentation

## Best Practices

1. **Commit oft**: Kleine, atomare Commits sind besser als große
2. **Ein Thema pro Commit**: Jeder Commit sollte nur eine Änderung enthalten
3. **Beschreibende Messages**: Erkläre das "Was" und "Warum", nicht das "Wie"
4. **Breaking Changes markieren**: Nutze `!` oder `BREAKING CHANGE:` Footer
5. **Issues referenzieren**: Nutze `Fixes #123` oder `Closes #456`
6. **Imperativ verwenden**: "add" statt "added", "fix" statt "fixed"
# Fix für Dependabot GitHub Action Error

## Problem
Dependabot-PRs schlagen bei Claude Code Review fehl mit der Fehlermeldung:
```
Action failed with error: Workflow initiated by non-human actor: dependabot (type: Bot). 
Add bot to allowed_bots list or use '*' to allow all bots.
```

## Lösung
In allen Workflow-Dateien, die `anthropics/claude-code-action` verwenden, muss der Parameter `allowed_bots: "dependabot"` hinzugefügt werden.

## Zu ändernde Dateien:

### 1. `.github/workflows/claude-code-review.yml`
**Zeile 34-38** ändern von:
```yaml
      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

**zu:**
```yaml
      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          allowed_bots: "dependabot"
```

### 2. `.github/workflows/auto-fix.yml`
Parameter `allowed_bots: "dependabot"` nach `anthropic_api_key` hinzufügen.

### 3. `.github/workflows/claude.yml` 
Parameter `allowed_bots: "dependabot"` nach `anthropic_api_key` hinzufügen.

### 4. `.github/workflows/issue-implementation.yml`
Parameter `allowed_bots: "dependabot"` nach `anthropic_api_key` hinzufügen.

### 5. `.github/workflows/issue-analysis.yml`
Parameter `allowed_bots: "dependabot"` nach `anthropic_api_key` hinzufügen.

## Alternative: Alle Bots erlauben
Statt `allowed_bots: "dependabot"` kann auch `allowed_bots: "*"` verwendet werden, um alle Bots zu erlauben.

## Nach der Änderung
Die Dependabot-PRs sollten dann erfolgreich durch die Claude Code Review laufen.
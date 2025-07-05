# Firebase Authentication Setup Guide

Dieses Projekt wurde mit Firebase Authentication und Google Sign-In konfiguriert. Folgen Sie dieser Anleitung, um Firebase zu konfigurieren und Google Authentication zu aktivieren.

## 1. Firebase-Projekt erstellen

1. Gehen Sie zu [Firebase Console](https://console.firebase.google.com/)
2. Klicken Sie auf "Projekt hinzufügen"
3. Geben Sie einen Projektnamen ein (z.B. "ai-automations-engineer")
4. Wählen Sie, ob Sie Google Analytics verwenden möchten
5. Klicken Sie auf "Projekt erstellen"

## 2. Web-App zu Firebase hinzufügen

1. Klicken Sie in der Firebase Console auf das Web-Icon (</>)
2. Geben Sie einen App-Namen ein
3. Wählen Sie "Auch Firebase Hosting für diese App einrichten" (optional)
4. Klicken Sie auf "App registrieren"
5. Kopieren Sie die Firebase-Konfiguration

## 3. Firebase-Konfiguration aktualisieren

Ersetzen Sie die Platzhalterwerte in den folgenden Dateien:

### `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "IHR_API_KEY",
    authDomain: "IHR_PROJECT_ID.firebaseapp.com",
    projectId: "IHR_PROJECT_ID",
    storageBucket: "IHR_PROJECT_ID.appspot.com",
    messagingSenderId: "IHR_SENDER_ID",
    appId: "IHR_APP_ID"
  }
};
```

### `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: "IHR_API_KEY",
    authDomain: "IHR_PROJECT_ID.firebaseapp.com",
    projectId: "IHR_PROJECT_ID",
    storageBucket: "IHR_PROJECT_ID.appspot.com",
    messagingSenderId: "IHR_SENDER_ID",
    appId: "IHR_APP_ID"
  }
};
```

## 4. Google Authentication aktivieren

1. Gehen Sie in der Firebase Console zu "Authentication" > "Sign-in method"
2. Klicken Sie auf "Google"
3. Aktivieren Sie "Enable"
4. Wählen Sie eine Support-E-Mail-Adresse
5. Klicken Sie auf "Speichern"

## 5. Autorisierte Domains hinzufügen

1. Gehen Sie zu "Authentication" > "Settings" > "Authorized domains"
2. Fügen Sie Ihre Domain hinzu (z.B. `localhost` für Entwicklung)
3. Für Produktion: Fügen Sie Ihre Live-Domain hinzu

## 6. Dependencies installieren

```bash
npm install
```

## 7. Anwendung starten

```bash
npm start
```

## 8. Testen

1. Öffnen Sie die Anwendung in Ihrem Browser
2. Klicken Sie auf "Mit Google anmelden"
3. Melden Sie sich mit Ihrem Google-Konto an
4. Überprüfen Sie, ob die Anmeldung erfolgreich war

## Erweiterte Konfiguration

### Firestore-Datenbank (Benutzerverwaltung)

Dieses Projekt verwendet Firestore für die Benutzerverwaltung und Profilspeicherung:

1. **Firestore-Datenbank einrichten**:
   - Gehen Sie zur Firebase Console > Firestore Database
   - Klicken Sie auf "Create database"
   - Wählen Sie "Start in production mode"
   - Wählen Sie eine Region (z.B. europe-west3)

2. **Sicherheitsregeln deployen**:
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Weitere Details**: Siehe `FIRESTORE_SETUP.md` für detaillierte Anweisungen

### Funktionen

- **Benutzerprofile**: Automatische Erstellung und Verwaltung von Benutzerprofilen
- **Intelligente Login-Verwaltung**: Profildaten werden nur beim ersten Login initialisiert
- **Profilbearbeitung**: Vollständige Profilbearbeitung mit Speicherung in Firestore
- **Datenschutz**: Benutzereingaben werden niemals durch Login-Prozess überschrieben
- **Öffentliche Profile**: Sichtbare Profile für Community-Mitglieder
- **Account-Löschung**: Komplette Löschung von Benutzerdaten
- **Sicherheitsregeln**: Schutz der Benutzerdaten durch Firestore-Regeln

### Zusätzliche Anbieter

Um weitere Anbieter hinzuzufügen:

1. Aktivieren Sie sie in der Firebase Console
2. Erweitern Sie den `AuthService` um die entsprechenden Provider
3. Aktualisieren Sie die `AuthButtonComponent`

## Fehlerbehebung

### Häufige Probleme

1. **"Firebase not initialized"**: Stellen Sie sicher, dass die Firebase-Konfiguration korrekt ist
2. **"Domain not authorized"**: Fügen Sie Ihre Domain zu den autorisierten Domains hinzu
3. **"API key not valid"**: Überprüfen Sie, ob der API-Key korrekt kopiert wurde

### Debugging

Öffnen Sie die Entwicklertools im Browser, um eventuelle Fehler zu sehen.

## Zusätzliche Ressourcen

- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire) 
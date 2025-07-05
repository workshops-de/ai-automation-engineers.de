# Firestore Integration Setup

Diese Anleitung erklärt, wie Sie die Firestore-Datenbank für die Benutzerverwaltung einrichten.

## Voraussetzungen

- Firebase-Projekt ist bereits erstellt
- Firebase CLI ist installiert (`npm install -g firebase-tools`)
- Sie sind bei Firebase angemeldet (`firebase login`)

## Schritt 1: Firebase-Projekt initialisieren

```bash
# Falls noch nicht gemacht
firebase init
```

Wählen Sie:
- Firestore: Configure security rules and indexes files
- Hosting: Configure files for Firebase Hosting

## Schritt 2: Firestore-Sicherheitsregeln und Indexes deployen

1. Stellen Sie sicher, dass die `firestore.rules` und `firestore.indexes.json` Dateien in Ihrem Projektverzeichnis liegen
2. Deployen Sie die Regeln und Indexes:

```bash
firebase deploy --only firestore
```

Oder getrennt:
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Schritt 3: Firestore-Datenbank erstellen

1. Gehen Sie zur Firebase Console (https://console.firebase.google.com/)
2. Wählen Sie Ihr Projekt aus
3. Navigieren Sie zu "Firestore Database"
4. Klicken Sie auf "Create database"
5. Wählen Sie "Start in production mode" (die Sicherheitsregeln sind bereits konfiguriert)
6. Wählen Sie eine Region (z.B. europe-west3 für Deutschland)

## Schritt 4: Erste Benutzer-Daten

Die Anwendung erstellt automatisch Benutzerprofile, wenn sich Benutzer zum ersten Mal anmelden.

### Intelligente Profilverwaltung

- **Erster Login**: Vollständiges Profil wird mit Firebase-Auth-Daten erstellt
- **Weitere Logins**: Nur minimale Felder (E-Mail, Profilbild) werden aktualisiert
- **Benutzerbearbeitung**: Wird niemals durch Login-Prozess überschrieben

### Manuelles Erstellen eines Admin-Benutzers

Falls Sie einen Admin-Benutzer erstellen möchten:

1. Melden Sie sich zunächst normal in der Anwendung an
2. Gehen Sie zur Firebase Console > Firestore Database
3. Finden Sie Ihr Benutzerdokument in der "users" Collection
4. Bearbeiten Sie das Dokument und setzen Sie `isAdmin: true`

## Schritt 5: Testen der Integration

1. Starten Sie die Anwendung: `npm start`
2. Melden Sie sich mit Google an
3. Navigieren Sie zu "Profile Management"
4. Bearbeiten Sie Ihr Profil und speichern Sie es
5. Überprüfen Sie in der Firebase Console, ob die Daten in Firestore gespeichert wurden

## Datenstruktur

### users Collection

```javascript
{
  id: "firebase-auth-uid",
  name: "Benutzername",
  email: "email@example.com",
  location: "Stadt, Land",
  company: "Firmenname",
  role: "Rolle",
  bio: "Biografie",
  profilePicture: "https://example.com/image.jpg",
  skills: ["Skill1", "Skill2"],
  experience: "5+ years",
  linkedinUrl: "https://linkedin.com/in/...",
  githubUrl: "https://github.com/...",
  websiteUrl: "https://website.com",
  isPublic: true,
  isAdmin: false,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Sicherheitsregeln Erklärung

Die Firestore-Sicherheitsregeln stellen sicher, dass:

- Benutzer nur ihre eigenen Daten lesen und schreiben können
- Öffentliche Profile von allen authentifizierten Benutzern gelesen werden können
- Neue Benutzer nur mit ihrer eigenen Auth-UID erstellt werden können
- Benutzer ihre eigene Admin-Rolle nicht ändern können
- Nur Admins können alle Benutzer verwalten

## Troubleshooting

### Fehler: "The query requires an index"

- Die Anwendung verwendet jetzt Client-seitige Sortierung, um Index-Anforderungen zu vermeiden
- Falls Sie erweiterte Abfragen benötigen, deployen Sie die Indexes:
  ```bash
  firebase deploy --only firestore:indexes
  ```
- Alternativ klicken Sie auf den Link in der Fehlermeldung, um den Index automatisch zu erstellen

### Fehler: "Permission denied"

- Überprüfen Sie, ob die Firestore-Sicherheitsregeln korrekt deployt wurden
- Stellen Sie sicher, dass der Benutzer angemeldet ist
- Überprüfen Sie die Browser-Konsole für detaillierte Fehlermeldungen

### Fehler: "Collection does not exist"

- Die "users" Collection wird automatisch erstellt, wenn das erste Dokument hinzugefügt wird
- Melden Sie sich einmal in der Anwendung an, um die Collection zu erstellen

### Fehler beim Speichern von Profildaten

- Überprüfen Sie die Netzwerkverbindung
- Stellen Sie sicher, dass die Firebase-Konfiguration korrekt ist
- Überprüfen Sie die Firebase Console für Fehlermeldungen

### Fehler: "No document to update"

- Dieser Fehler wurde behoben - die Anwendung verwendet jetzt `setDoc` für neue Dokumente
- Stellen Sie sicher, dass Sie die neueste Version der Services verwenden

### Profildaten werden bei jedem Login überschrieben

- **Behoben**: Die Anwendung unterscheidet jetzt zwischen neuen und bestehenden Benutzern
- Beim ersten Login wird ein vollständiges Profil erstellt
- Bei weiteren Logins werden nur minimale Felder (E-Mail, Profilbild) aktualisiert
- Benutzereingaben werden niemals durch den Login-Prozess überschrieben

## Backup und Wiederherstellung

```bash
# Backup erstellen
firebase firestore:export gs://your-project-backup-bucket

# Wiederherstellung
firebase firestore:import gs://your-project-backup-bucket/your-export-folder
```

## Monitoring

- Firebase Console > Firestore Database > Usage
- Überwachen Sie Lese-/Schreibvorgänge
- Beachten Sie die Kosten für Firestore-Operationen

## Produktionsüberlegungen

1. **Indexierung**: Erstellen Sie Composite Indexes für komplexe Abfragen
2. **Pagination**: Implementieren Sie Pagination für große Datenmengen
3. **Caching**: Nutzen Sie lokales Caching für bessere Performance
4. **Batch-Operationen**: Verwenden Sie Batch-Writes für mehrere Operationen
5. **Monitoring**: Implementieren Sie Logging und Monitoring 
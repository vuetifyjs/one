# Vuetify One

## User Settings Architecture

User settings have **two sources of truth** that must stay in sync:

1. **localStorage** (`vuetify@user`) - loaded in `stores/user.ts`
2. **Server settings** (`user.settings`) - synced in `stores/auth.ts`

### Adding New User Settings Fields

When adding new fields to `DEFAULT_USER`:

1. Add the field to `DEFAULT_USER` in `stores/user.ts`
2. Update `RootState` type in `stores/migrations.ts`
3. Bump version number (e.g., 6 → 7)
4. Create migration function (e.g., `migrateV6ToV7`)
5. **Critical**: Update BOTH migration points:
   - `user.ts` `load()` function - handles localStorage
   - `auth.ts` user watcher - handles server settings sync

The `auth.ts` watcher overwrites the store with server settings. If server settings don't have the new field and you don't merge with defaults, you'll get `undefined` errors.

```typescript
// auth.ts - correct pattern for server settings sync
let settings = user.settings
if (settings.version === 6) {
  settings = migrateV6ToV7(settings)
}
const merged = {
  version: 7,
  ecosystem: merge(structuredClone(DEFAULT_USER.ecosystem), settings.ecosystem || {}),
  one: merge(structuredClone(DEFAULT_USER.one), settings.one || {}),
}
Object.assign(userStore, merged)
```

## Stores

- `auth.ts` - Authentication, user session, settings sync
- `user.ts` - User preferences (theme, notifications, etc.)
- `one.ts` - Vuetify One subscription state
- `team.ts` - Team management

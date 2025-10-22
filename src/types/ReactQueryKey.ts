export type ReactQueryKey =
  | ['firebase/auth', 'state']
  | ['localStorage', 'hasSeenWelcomePage']
  | ['firebase/emulators', 'setup']
  | ['firebase/database', 'value', { path: string }]

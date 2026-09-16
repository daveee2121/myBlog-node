// Nur Frontend-Typen. Fachliche Typen und API-Verträge liegen in @myblog/shared.

// Zustand, den eine Server Action an das Formular zurückgibt (useActionState)
export type PostFormState = {
  error?: string
  fieldErrors?: {
    title?: string[]
    content?: string[]
  }
  values?: {
    title: string
    content: string
  }
} | null

'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button-variants'
import type { PostFormState } from '../types'

// Ein Formular für Erstellen und Bearbeiten.
// Client Component, weil useActionState die Fehler der Server Action anzeigt.
// Die Action selbst läuft trotzdem auf dem Server.

type PostFormProps = {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>
  defaultValues?: { title: string; content: string }
  submitLabel: string
  cancelHref?: string
}

export function PostForm({ action, defaultValues, submitLabel, cancelHref }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, null)

  // Nach einem Fehler die eingegebenen Werte behalten, sonst die Startwerte
  const values = state?.values ?? defaultValues

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <p className="text-sm text-destructive" role="alert">{state.error}</p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          name="title"
          placeholder="Titel des Posts"
          defaultValue={values?.title}
          aria-invalid={Boolean(state?.fieldErrors?.title)}
          required
        />
        {state?.fieldErrors?.title && (
          <p className="text-sm text-destructive">{state.fieldErrors.title[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Inhalt</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Schreibe deinen Post..."
          defaultValue={values?.content}
          className="min-h-40 resize-none"
          aria-invalid={Boolean(state?.fieldErrors?.content)}
          required
        />
        {state?.fieldErrors?.content && (
          <p className="text-sm text-destructive">{state.fieldErrors.content[0]}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? 'Speichern...' : submitLabel}
        </Button>
        {cancelHref && (
          <Link href={cancelHref} className={buttonVariants({ variant: 'outline' })}>
            Abbrechen
          </Link>
        )}
      </div>
    </form>
  )
}

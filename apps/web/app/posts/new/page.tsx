import { createPostAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// Server Component — form action zeigt direkt auf Server Action
export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Neuer Post</h1>
      <form action={createPostAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" name="title" placeholder="Titel des Posts" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Inhalt</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Schreibe deinen Post..."
            className="min-h-40 resize-none"
            required
          />
        </div>
        <Button type="submit" className="self-start">Erstellen</Button>
      </form>
    </div>
  )
}

import { buttonVariants } from '@/components/ui/button-variants'
import { deletePostAction } from '../actions/post.actions'

// Post-spezifischer Button, deshalb im Feature und nicht in components/ui.
// Server Component: Formular ruft die Server Action direkt auf, kein onClick nötig.
export function DeletePostButton({ id }: { id: string }) {
  return (
    <form action={deletePostAction.bind(null, id)}>
      <button type="submit" className={buttonVariants({ variant: 'destructive' })}>
        Löschen
      </button>
    </form>
  )
}

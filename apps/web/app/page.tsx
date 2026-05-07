import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4">

      {/* Radial gradient fade over grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, hsl(var(--background, 0 0% 100%) / 0) 60%, var(--background) 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          ✦ Persönliches Blog
        </span>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
          Willkommen auf{' '}
          <span className="relative inline-block">
            <span className="relative z-10">meinem Blog</span>
            <span
              className="absolute inset-x-0 bottom-1 h-3 -z-10 rounded-sm opacity-20 bg-foreground"
              aria-hidden
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
          Hier schreibe ich über Dinge, die mich interessieren — Technik,
          Projekte und alles dazwischen.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mt-2">
          <Link href="/posts" className={buttonVariants({ size: 'lg' })}>
            Alle Posts lesen →
          </Link>
          <Link
            href="/posts/new"
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Neuen Post schreiben
          </Link>
        </div>
      </div>
    </div>
  )
}

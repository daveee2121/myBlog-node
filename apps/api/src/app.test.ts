import assert from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import request from 'supertest'
import type { Express } from 'express'

process.env.NODE_ENV = 'test'
process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/test'
process.env.WEB_ORIGIN ??= 'http://localhost:3000'

let app: Express

before(async () => {
  app = (await import('./app')).default
})

describe('API-Grundschutz', () => {
  it('liefert 400 für syntaktisch ungültiges JSON', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Content-Type', 'application/json')
      .send('{invalid')

    assert.equal(response.status, 400)
    assert.deepEqual(response.body, { error: 'Ungültiges JSON' })
  })

  it('validiert einen ungültigen Post vor dem Datenbankzugriff', async () => {
    const response = await request(app).post('/api/posts').send({ title: '', content: '' })

    assert.equal(response.status, 400)
    assert.equal(response.body.error, 'Ungültige Eingabe')
  })

  it('sendet Sicherheitsheader und verbirgt Express', async () => {
    const response = await request(app).get('/nicht-vorhanden')

    assert.equal(response.status, 404)
    assert.equal(response.headers['x-powered-by'], undefined)
    assert.equal(response.headers['x-content-type-options'], 'nosniff')
  })
})

/// <reference types="vitest" />
import { describe, it, expect } from 'vitest'
import { buildThreads } from '../comments'

describe('buildThreads', () => {
  it('should build nested threads correctly', () => {
    const flat = [
      { id: '1', content: 'root 1' },
      { id: '2', content: 'root 2' },
      { id: '3', content: 'reply to 1', parent_comment_id: '1' },
      { id: '4', content: 'reply to 3', parent_comment_id: '3' },
      { id: '5', content: 'reply to 2', parent_comment_id: '2' },
    ]

    const roots = buildThreads(flat as any)

    expect(roots.map(r => r.id)).toEqual(['1','2'])
    const root1 = roots.find(r => r.id === '1')
    expect(root1).toBeDefined()
    expect(root1?.replies.length).toBe(1)
    expect(root1?.replies[0].id).toBe('3')
    expect(root1?.replies[0].replies[0].id).toBe('4')
  })
})

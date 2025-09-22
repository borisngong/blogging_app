import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockUser = { id: 'user-1', email: 'test@example.com' };
const mockPostId = '11111111-1111-4111-8111-111111111111';
const mockParentId = '22222222-2222-4222-8222-222222222222';

// Prepare mock holders used by the hoisted vi.mock below
const mockAuthGetUser = vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null });
const mockFrom = vi.fn();

const supabaseMock = {
  auth: { getUser: mockAuthGetUser },
  from: mockFrom,
};

// Mock the revalidatePath to be a noop (hoisted-safe simple factory)
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

describe('createComment server action', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // restore default auth behavior
    mockAuthGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    mockFrom.mockReset();
  });

  it('returns error when postId or content missing', async () => {
    // dynamically import module without mocking supabase (default mock not needed)
    const { createComment } = await import('../comments');
    const res = await createComment('', '');
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/Missing required fields|Invalid post ID format/);
  });

  it('returns error for invalid postId format', async () => {
    const { createComment } = await import('../comments');
    const res = await createComment('not-a-uuid', 'hello');
    expect(res.success).toBe(false);
    expect(res.error).toBe('Invalid post ID format');
  });

  it('returns error when parentCommentId is invalid format', async () => {
    const badParent = 'not-a-uuid';
    const { createComment } = await import('../comments');
    const res = await createComment(mockPostId, 'reply', undefined, badParent);
    expect(res.success).toBe(false);
    expect(res.error).toBe('Invalid parent comment ID format');
  });

  it('successfully inserts a comment with no parent', async () => {
    const insertResult = { id: 'comment-1', content: 'hello', author_id: mockUser.id, post_id: mockPostId };

    const mockClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null }) },
      from: (table: string) => {
        if (table === 'posts') {
          return {
            select: () => ({ eq: () => ({ eq: () => ({ single: async () => ({ data: { id: mockPostId, published: true }, error: null }) }) }) }),
          } as any;
        }
        if (table === 'comments') {
          return {
            insert: () => ({ select: () => ({ single: async () => ({ data: insertResult, error: null }) }) }),
            select: () => ({ eq: () => ({ eq: () => ({ single: async () => ({ data: null, error: { message: 'not found' } }) }) }) }),
          } as any;
        }
        return {} as any;
      },
    };

    const { createComment } = await import('../comments');
    const res = await createComment(mockPostId, 'This is a test comment', undefined, undefined, mockClient as any);
    expect(res.success).toBe(true);
    expect(res.comment).toEqual(insertResult);
  });

  it('returns error when parent comment does not exist', async () => {
    const mockClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null }) },
      from: (table: string) => {
        if (table === 'comments') {
          return { select: () => ({ eq: () => ({ single: async () => ({ data: null, error: { message: 'not found' } }) }) }) } as any;
        }
        if (table === 'posts') {
          return { select: () => ({ eq: () => ({ eq: () => ({ single: async () => ({ data: { id: mockPostId, published: true }, error: null }) }) }) }) } as any;
        }
        return {} as any;
      },
    };

    const { createComment } = await import('../comments');
    const res = await createComment(mockPostId, 'reply', undefined, mockParentId, mockClient as any);
    expect(res.success).toBe(false);
    expect(res.error).toBe('Parent comment not found');
  });
});

export type CommentRow = {
  id: string;
  parent_comment_id?: string | null;
  [key: string]: any;
};

export function buildThreads(comments: CommentRow[]) {
  const map = new Map<string, CommentRow & { replies: CommentRow[] }>();
  const roots: (CommentRow & { replies: CommentRow[] })[] = [];

  comments.forEach((c) => {
    map.set(c.id, { ...c, replies: [] });
  });

  map.forEach((comment) => {
    if (comment.parent_comment_id) {
      const parent = map.get(comment.parent_comment_id);
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

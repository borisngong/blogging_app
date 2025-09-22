import { getAuthorName, getAuthorColor, getAuthorInitials, formatPostDate } from '@/lib/utils/author';

interface AuthorDisplayProps {
  authorId: string;
  createdAt?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showDate?: boolean;
  className?: string;
}

/**
 * AuthorDisplay component that shows author information with avatar and styling
 */
export default function AuthorDisplay({ 
  authorId, 
  createdAt, 
  variant = 'default',
  showDate = true,
  className = ''
}: AuthorDisplayProps) {
  const authorName = getAuthorName(authorId);
  const authorColor = getAuthorColor(authorId);
  const authorInitials = getAuthorInitials(authorId);
  const formattedDate = createdAt ? formatPostDate(createdAt) : null;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
          style={{ backgroundColor: authorColor }}
        >
          {authorInitials}
        </div>
        <span className="text-sm text-muted-foreground">{authorName}</span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white shadow-sm"
          style={{ backgroundColor: authorColor }}
        >
          {authorInitials}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{authorName}</span>
          {showDate && formattedDate && (
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
        style={{ backgroundColor: authorColor }}
      >
        {authorInitials}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{authorName}</span>
        {showDate && formattedDate && (
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}

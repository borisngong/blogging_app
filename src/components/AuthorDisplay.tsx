import { formatPostDate } from "@/lib/utils/author";
import Image from "next/image";

interface Profile {
  id?: string;
  full_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
}

interface AuthorDisplayProps {
  // either pass authorId (legacy) or full profile object
  authorId?: string;
  profile?: Profile;
  createdAt?: string;
  variant?: "default" | "compact" | "detailed";
  showDate?: boolean;
  className?: string;
}

function initialsFromName(name?: string | null, fallbackId?: string) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }
  if (fallbackId) return fallbackId.substring(0, 2).toUpperCase();
  return "AN";
}

/**
 * AuthorDisplay component that shows author information with avatar and styling
 * Accepts either an `authorId` (legacy) or a `profile` object containing
 * `full_name`, `username`, and `avatar_url`.
 */
export default function AuthorDisplay({
  authorId,
  profile,
  createdAt,
  variant = "default",
  showDate = true,
  className = "",
}: AuthorDisplayProps) {
  const name = profile?.full_name || profile?.username || "Anonymous";
  const display = name;
  const avatar = profile?.avatar_url || null;
  const formattedDate = createdAt ? formatPostDate(createdAt) : null;

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-800">
          {avatar ? (
            <Image
              src={avatar}
              alt={display}
              width={24}
              height={24}
              className="object-cover"
              unoptimized
            />
          ) : (
            <span>{initialsFromName(profile?.full_name, profile?.id)}</span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{display}</span>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-sm font-medium text-white shadow-sm bg-gray-200 dark:bg-gray-700">
          {avatar ? (
            <Image
              src={avatar}
              alt={display}
              width={40}
              height={40}
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-gray-800">
              {initialsFromName(profile?.full_name, profile?.id)}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{display}</span>
          {showDate && formattedDate && (
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-medium text-white bg-gray-200 dark:bg-gray-700">
        {avatar ? (
          <Image
            src={avatar}
            alt={display}
            width={32}
            height={32}
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-gray-800">
            {initialsFromName(profile?.full_name, profile?.id)}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{display}</span>
        {showDate && formattedDate && (
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}

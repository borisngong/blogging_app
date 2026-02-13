"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md ring-1 ring-black/5">
                <span className="text-white font-semibold">B</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                My Blog
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 rounded-lg px-2 py-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

            {/* Auth area */}
            <div>
              {user ? (
                <AccountDropdown
                  user={user}
                  loading={loading}
                  onSignOut={handleSignOut}
                />
              ) : (
                <Link href="/auth">
                  <Button className="rounded-md">Sign in</Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                {mobileOpen ? (
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="rounded-lg bg-white/95 dark:bg-gray-900/95 shadow p-3 space-y-3">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t pt-2">
                {user ? (
                  <div className="space-y-2">
                    <AccountDropdown
                      user={user}
                      loading={loading}
                      onSignOut={handleSignOut}
                      mobile
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth">
                      <Button className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/auth?signup=true">
                      <Button variant="ghost" className="w-full mt-1">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function AccountDropdown({
  user,
  loading,
  onSignOut,
  mobile = false,
}: {
  user: any;
  loading: boolean;
  onSignOut: () => Promise<void> | void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // keyboard navigation for the toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        // focus first menu item later if needed
      }
    }
    const el = btnRef.current;
    el?.addEventListener("keydown", onKey as any);
    return () => el?.removeEventListener("keydown", onKey as any);
  }, []);

  const displayName = user
    ? user.user_metadata?.full_name || user.email
    : "Guest";

  if (mobile) {
    if (user) {
      return (
        <div className="space-y-1">
          <Link
            href={`/users/${user.id}`}
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => {}}
          >
            Profile
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Settings
          </Link>
          <button
            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => onSignOut()}
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      );
    }

    return (
      <div>
        <Link href="/auth">
          <Button className="w-full">Sign In</Button>
        </Link>
        <Link href="/auth?signup=true">
          <Button variant="ghost" className="w-full mt-2">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={btnRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200 ring-1 ring-black/5">
          {displayName?.charAt(0) ?? "U"}
        </div>
        <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-200">
          {displayName}
        </span>
        <svg
          className="w-4 h-4 text-muted-foreground"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account options"
          className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none z-30"
        >
          <div className="py-1">
            <Link
              href={`/users/${user?.id}`}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
            >
              {loading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

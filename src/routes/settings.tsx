import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, User, CreditCard } from "lucide-react";

import { Sidebar } from "@/components/learnify/Sidebar";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Learnify" }] }),
  component: SettingsPage,
});

const SECTIONS = [
  { icon: User,       label: "Profile",       accent: "cyan"    },
  { icon: Bell,       label: "Notifications", accent: "violet"  },
  { icon: Palette,    label: "Appearance",    accent: "emerald" },
  { icon: Shield,     label: "Privacy",       accent: "amber"   },
  { icon: CreditCard, label: "Billing",       accent: "pink"    },
];

type SettingsSection = "Profile" | "Notifications" | "Appearance" | "Privacy" | "Billing";

type NotificationSetting = {
  label: string;
  sub: string;
  on: boolean;
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        on ? "bg-[var(--neon-cyan)]" : "bg-foreground/15"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("Profile");
  const [profile, setProfile] = useState({
    displayName: "Nova Kim",
    username: "@nova_kim",
    email: "nova.kim@neural.campus",
    timezone: "Asia/Kolkata (IST)",
  });
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { label: "Daily streak reminder", sub: "Get a nudge if you haven't studied yet today", on: true },
    { label: "New mentor messages", sub: "Push and email when a mentor replies", on: true },
    { label: "Course updates", sub: "When new lessons are added to enrolled courses", on: false },
    { label: "Weekly progress report", sub: "Sunday summary of your learning week", on: true },
  ]);
  const [appearance, setAppearance] = useState({ theme: "Dark", accent: "Cyan" });
  const [privacy, setPrivacy] = useState({ publicProfile: true, dataSharing: false });
  const [billing, setBilling] = useState({ plan: "Pro", card: "**** **** **** 1234" });

  const saveProfile = () => {
    alert("Profile settings saved.");
  };

  const saveNotifications = () => {
    alert("Notification preferences saved.");
  };

  const saveAppearance = () => {
    alert("Appearance settings saved.");
  };

  const savePrivacy = () => {
    alert("Privacy settings saved.");
  };

  const saveBilling = () => {
    alert("Billing settings saved.");
  };

  const sectionContent = () => {
    switch (activeSection) {
      case "Profile":
        return (
          <div className="rounded-2xl glass-panel p-6">
            <h2 className="text-base font-semibold">Profile information</h2>
            <p className="mt-1 text-sm text-muted-foreground">Update your name, avatar, and bio.</p>
            <div className="mt-6 flex items-center gap-5">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] text-xl font-bold text-background">
                {profile.displayName
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium">{profile.displayName}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
                <button type="button" className="mt-2 text-xs font-semibold text-[var(--neon-cyan)] hover:underline">
                  Change avatar
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Display name", value: profile.displayName, id: "displayName" },
                { label: "Username", value: profile.username, id: "username" },
                { label: "Email", value: profile.email, id: "email" },
                { label: "Timezone", value: profile.timezone, id: "timezone" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    value={field.value}
                    onChange={(e) => setProfile((prev) => ({ ...prev, [field.id]: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground focus:border-[var(--neon-cyan)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={saveProfile}
              className="mt-6 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-5 py-2 text-sm font-semibold text-background"
            >
              Save changes
            </button>
          </div>
        );
      case "Notifications":
        return (
          <div className="rounded-2xl glass-panel p-6">
            <h2 className="text-base font-semibold">Notifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose what you want to be notified about.</p>
            <div className="mt-6 flex flex-col gap-5">
              {notifications.map((n, index) => (
                <div key={n.label} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.sub}</p>
                  </div>
                  <Toggle
                    on={n.on}
                    onToggle={() =>
                      setNotifications((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, on: !item.on } : item)),
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={saveNotifications}
              className="mt-6 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-5 py-2 text-sm font-semibold text-background"
            >
              Save notification settings
            </button>
          </div>
        );
      case "Appearance":
        return (
          <div className="rounded-2xl glass-panel p-6">
            <h2 className="text-base font-semibold">Appearance</h2>
            <p className="mt-1 text-sm text-muted-foreground">Customize how Learnify looks and feels.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Theme</span>
                <select
                  value={appearance.theme}
                  onChange={(e) => setAppearance((prev) => ({ ...prev, theme: e.target.value }))}
                  className="w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground"
                >
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Accent color</span>
                <select
                  value={appearance.accent}
                  onChange={(e) => setAppearance((prev) => ({ ...prev, accent: e.target.value }))}
                  className="w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground"
                >
                  <option>Cyan</option>
                  <option>Violet</option>
                  <option>Emerald</option>
                  <option>Amber</option>
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={saveAppearance}
              className="mt-6 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-5 py-2 text-sm font-semibold text-background"
            >
              Save appearance settings
            </button>
          </div>
        );
      case "Privacy":
        return (
          <div className="rounded-2xl glass-panel p-6">
            <h2 className="text-base font-semibold">Privacy</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage your privacy settings.</p>
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Public profile</p>
                  <p className="text-xs text-muted-foreground">Allow others to view your profile and progress.</p>
                </div>
                <Toggle
                  on={privacy.publicProfile}
                  onToggle={() => setPrivacy((prev) => ({ ...prev, publicProfile: !prev.publicProfile }))}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Data sharing</p>
                  <p className="text-xs text-muted-foreground">Share anonymized usage data to improve recommendations.</p>
                </div>
                <Toggle
                  on={privacy.dataSharing}
                  onToggle={() => setPrivacy((prev) => ({ ...prev, dataSharing: !prev.dataSharing }))}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={savePrivacy}
              className="mt-6 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-5 py-2 text-sm font-semibold text-background"
            >
              Save privacy settings
            </button>
          </div>
        );
      case "Billing":
        return (
          <div className="rounded-2xl glass-panel p-6">
            <h2 className="text-base font-semibold">Billing</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage your subscription and payment method.</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <p className="text-sm font-medium">Current plan</p>
                <p className="text-xs text-muted-foreground">{billing.plan}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <p className="text-sm font-medium">Payment method</p>
                <p className="text-xs text-muted-foreground">{billing.card}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={saveBilling}
              className="mt-6 rounded-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] px-5 py-2 text-sm font-semibold text-background"
            >
              Save billing settings
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="mx-auto max-w-4xl px-5 pb-16 pt-10 lg:px-8">
          <header className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/8 text-muted-foreground">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </header>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const isActive = s.label === activeSection;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActiveSection(s.label as SettingsSection)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--neon-cyan)]/15 to-[var(--neon-violet)]/10 text-foreground ring-1 ring-[var(--neon-cyan)]/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-col gap-4"
          >
            {sectionContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

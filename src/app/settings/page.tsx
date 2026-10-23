"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";

const STORAGE_KEY = "whodeylive-prefs";

type Prefs = {
  reducedMotion: boolean;
  kickoffReminder: boolean;
  scoreAlerts: boolean;
};

const defaults: Prefs = {
  reducedMotion: false,
  kickoffReminder: true,
  scoreAlerts: true,
};

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<Prefs>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...defaults, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function update(partial: Partial<Prefs>) {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  if (!ready) {
    return (
      <div className="py-20 text-center text-bengals-gray text-sm">Loading…</div>
    );
  }

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Settings</h1>
        <p className="text-bengals-gray-light mt-1 text-sm">Preferences stored on this device</p>
      </div>

      {/* Notifications */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-bengals-gray">Notifications</h2>
        <div className="rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal divide-y divide-bengals-charcoal-light">
          <ToggleRow
            label="Kickoff reminders"
            description="Alert before game start"
            checked={prefs.kickoffReminder}
            onChange={(v) => update({ kickoffReminder: v })}
          />
          <ToggleRow
            label="Score alerts"
            description="Notify on scoring plays"
            checked={prefs.scoreAlerts}
            onChange={(v) => update({ scoreAlerts: v })}
          />
        </div>
      </section>

      {/* Display */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-bengals-gray">Display</h2>
        <div className="rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal divide-y divide-bengals-charcoal-light">
          <ToggleRow
            label="Reduced motion"
            description="Minimize animations"
            checked={prefs.reducedMotion}
            onChange={(v) => update({ reducedMotion: v })}
          />
        </div>
      </section>

      {/* About */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-bengals-gray">About</h2>
        <div className="rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-bengals-gray-light">Version</span>
            <span className="font-score text-white">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-bengals-gray-light">Data</span>
            <Badge variant="alert">DEMO / ESPN</Badge>
          </div>
          <p className="text-xs text-bengals-gray leading-relaxed pt-2 border-t border-bengals-charcoal-light">
            Fan-created experience. Not affiliated with the NFL, the Cincinnati Bengals
            organization, or ESPN. Data may be delayed.
          </p>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-bengals-gray">{description}</p>
      </div>
      <div
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-bengals-orange" : "bg-bengals-charcoal-light"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </div>
    </button>
  );
}

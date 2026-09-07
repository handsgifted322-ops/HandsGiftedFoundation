"use client";

import { useEffect, useMemo, useRef } from "react";
import { KINGDOM_BACKGROUND } from "./kingdom-background";

export type KingdomGameZone = {
  id: string;
  title: string;
  subtitle: string;
  status: "current" | "open" | "locked";
  x: number;
  y: number;
};

type Props = {
  zones: KingdomGameZone[];
  onSelectZone: (zoneId: string) => void;
};

const WORLD_WIDTH = 1536;
const WORLD_HEIGHT = 1024;

export function KingdomGameCanvas({ zones, onSelectZone }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const zonesKey = useMemo(() => zones.map((z) => `${z.id}:${z.status}:${z.x}:${z.y}`).join("|"), [zones]);

  useEffect(() => {
    let game: import("phaser").Game | null = null;
    let cancelled = false;

    const boot = async () => {
      const Phaser = (await import("phaser")).default;
      if (cancelled || !hostRef.current) return;

      const zoneSnapshot = zones.map((zone) => ({ ...zone }));

      class KingdomScene extends Phaser.Scene {
        constructor() {
          super("KingdomHub");
        }

        preload() {
          this.load.image("kingdom-background", KINGDOM_BACKGROUND);
        }

        create() {
          this.cameras.main.setBackgroundColor("#120b18");

          const background = this.add.image(0, 0, "kingdom-background").setOrigin(0, 0);
          background.setDisplaySize(WORLD_WIDTH, WORLD_HEIGHT);

          // Keep the approved Kingdom artwork intact. Phaser supplies the interaction,
          // subtle animated beacons, locked-state indicators, and room entry events.
          zoneSnapshot.forEach((zone) => {
            const x = (zone.x / 100) * WORLD_WIDTH;
            const y = (zone.y / 100) * WORLD_HEIGHT;
            const hit = this.add.zone(x, y, 330, 125).setOrigin(0.5).setInteractive({ useHandCursor: true });
            hit.setData("zoneId", zone.id);

            const halo = this.add.ellipse(x, y + 34, 86, 34, zone.status === "locked" ? 0x3b253f : 0xf5c95a, 0.05)
              .setStrokeStyle(zone.status === "locked" ? 1 : 2, zone.status === "locked" ? 0x8a718d : 0xf7d97e, zone.status === "locked" ? 0.28 : 0.62);

            this.tweens.add({
              targets: halo,
              scaleX: zone.status === "locked" ? 1.08 : 1.34,
              scaleY: zone.status === "locked" ? 1.08 : 1.34,
              alpha: zone.status === "locked" ? 0.02 : 0.11,
              duration: zone.status === "locked" ? 2200 : 1500,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut",
              delay: Math.floor(Math.random() * 500),
            });

            if (zone.status === "locked") {
              this.add.text(x + 142, y + 36, "🔒", {
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
              }).setOrigin(0.5).setDepth(5);
            }

            hit.on("pointerover", () => {
              halo.setAlpha(zone.status === "locked" ? 0.08 : 0.2);
              halo.setScale(1.22);
            });
            hit.on("pointerout", () => {
              halo.setAlpha(zone.status === "locked" ? 0.03 : 0.08);
            });
            hit.on("pointerdown", () => onSelectZone(zone.id));
          });

          // Small ambient light motes make the hub feel alive without covering the art.
          for (let i = 0; i < 14; i += 1) {
            const mote = this.add.circle(
              Phaser.Math.Between(120, WORLD_WIDTH - 120),
              Phaser.Math.Between(180, WORLD_HEIGHT - 120),
              Phaser.Math.Between(2, 4),
              0xffdf86,
              Phaser.Math.FloatBetween(0.16, 0.42),
            );
            this.tweens.add({
              targets: mote,
              y: mote.y - Phaser.Math.Between(24, 70),
              alpha: 0,
              duration: Phaser.Math.Between(2200, 4200),
              repeat: -1,
              delay: Phaser.Math.Between(0, 1600),
            });
          }
        }
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        backgroundColor: "#120b18",
        transparent: false,
        render: {
          antialias: true,
          pixelArt: false,
          roundPixels: false,
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
        },
        scene: [KingdomScene],
      });
    };

    void boot();

    return () => {
      cancelled = true;
      if (game) game.destroy(true);
    };
  }, [zonesKey, onSelectZone, zones]);

  return <div ref={hostRef} className="kingdom-phaser-host" aria-label="Interactive Hands Gifted Kingdom Academy hub" />;
}

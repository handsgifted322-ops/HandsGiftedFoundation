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
  learnerName: string;
  zones: KingdomGameZone[];
  onNearbyZone: (zoneId: string | null) => void;
  onSelectZone: (zoneId: string) => void;
};

const WORLD_WIDTH = 1536;
const WORLD_HEIGHT = 1024;

export function KingdomGameCanvas({ learnerName, zones, onNearbyZone, onSelectZone }: Props) {
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
        private player!: Phaser.GameObjects.Container;
        private target = new Phaser.Math.Vector2(WORLD_WIDTH / 2, WORLD_HEIGHT * 0.78);
        private keys?: {
          up: Phaser.Input.Keyboard.Key;
          down: Phaser.Input.Keyboard.Key;
          left: Phaser.Input.Keyboard.Key;
          right: Phaser.Input.Keyboard.Key;
          w: Phaser.Input.Keyboard.Key;
          a: Phaser.Input.Keyboard.Key;
          s: Phaser.Input.Keyboard.Key;
          d: Phaser.Input.Keyboard.Key;
        };
        private targetZoneId: string | null = null;
        private lastNearbyId: string | null = null;
        private glows: Phaser.GameObjects.Arc[] = [];

        constructor() {
          super("KingdomHub");
        }

        preload() {
          this.load.image("kingdom-background", KINGDOM_BACKGROUND);
        }

        create() {
          this.cameras.main.setBackgroundColor("#180f21");
          this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

          const background = this.add.image(0, 0, "kingdom-background").setOrigin(0, 0);
          background.setDisplaySize(WORLD_WIDTH, WORLD_HEIGHT);

          zoneSnapshot.forEach((zone) => {
            const x = (zone.x / 100) * WORLD_WIDTH;
            const y = (zone.y / 100) * WORLD_HEIGHT;
            const hit = this.add.zone(x, y, 250, 120).setOrigin(0.5).setInteractive({ useHandCursor: true });
            hit.setData("zoneId", zone.id);

            if (zone.status !== "locked") {
              const glow = this.add.circle(x, y + 28, 18, 0xf5c95a, 0.12).setStrokeStyle(2, 0xf7d97e, 0.55);
              this.glows.push(glow);
              this.tweens.add({
                targets: glow,
                scale: 1.7,
                alpha: 0.03,
                duration: 1500,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut",
                delay: Math.floor(Math.random() * 600),
              });
            }

            hit.on("pointerdown", () => {
              this.target.set(x, Math.min(WORLD_HEIGHT - 80, y + 90));
              this.targetZoneId = zone.id;
              onSelectZone(zone.id);
            });
          });

          const shadow = this.add.ellipse(0, 35, 50, 18, 0x000000, 0.28);
          const robe = this.add.graphics();
          robe.fillStyle(0xf8f0d7, 1);
          robe.fillRoundedRect(-20, -5, 40, 58, 10);
          robe.fillStyle(0x4f205f, 1);
          robe.fillTriangle(-17, 2, 17, 2, 0, 52);
          robe.lineStyle(3, 0xd9ad42, 1);
          robe.strokeTriangle(-17, 2, 17, 2, 0, 52);
          const head = this.add.circle(0, -23, 14, 0x79503b, 1).setStrokeStyle(2, 0x2a1915, 1);
          const crown = this.add.text(0, -48, "♛", { fontFamily: "Georgia, serif", fontSize: "22px", color: "#f2cf68" }).setOrigin(0.5);
          const name = this.add.text(0, 62, learnerName, {
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            color: "#fff2c8",
            backgroundColor: "rgba(29,16,37,.82)",
            padding: { x: 8, y: 4 },
          }).setOrigin(0.5);

          this.player = this.add.container(this.target.x, this.target.y, [shadow, robe, head, crown, name]);
          this.player.setDepth(50);

          this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
          this.cameras.main.setDeadzone(120, 90);

          if (this.input.keyboard) {
            const cursors = this.input.keyboard.createCursorKeys();
            this.keys = {
              up: cursors.up!,
              down: cursors.down!,
              left: cursors.left!,
              right: cursors.right!,
              w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
              a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
              s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
              d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            };
          }

          this.input.on("pointerdown", (pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
            if (currentlyOver.length) return;
            const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
            this.target.set(
              Phaser.Math.Clamp(worldPoint.x, 40, WORLD_WIDTH - 40),
              Phaser.Math.Clamp(worldPoint.y, 100, WORLD_HEIGHT - 60),
            );
            this.targetZoneId = null;
            onNearbyZone(null);
          });

          this.scale.on("resize", (gameSize: Phaser.Structs.Size) => {
            const compact = gameSize.width < 720;
            this.cameras.main.setZoom(compact ? 1.02 : 1);
          });
        }

        update(_: number, delta: number) {
          if (!this.player) return;

          const keyboardX = this.keys ? Number(this.keys.right.isDown || this.keys.d.isDown) - Number(this.keys.left.isDown || this.keys.a.isDown) : 0;
          const keyboardY = this.keys ? Number(this.keys.down.isDown || this.keys.s.isDown) - Number(this.keys.up.isDown || this.keys.w.isDown) : 0;
          const speed = 260 * (delta / 1000);

          if (keyboardX || keyboardY) {
            const vec = new Phaser.Math.Vector2(keyboardX, keyboardY).normalize().scale(speed);
            this.player.x = Phaser.Math.Clamp(this.player.x + vec.x, 35, WORLD_WIDTH - 35);
            this.player.y = Phaser.Math.Clamp(this.player.y + vec.y, 90, WORLD_HEIGHT - 55);
            this.target.set(this.player.x, this.player.y);
            this.targetZoneId = null;
          } else {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y);
            if (distance > 4) {
              const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.target.x, this.target.y);
              const step = Math.min(speed, distance);
              this.player.x += Math.cos(angle) * step;
              this.player.y += Math.sin(angle) * step;
            }
          }

          let nearby: string | null = null;
          let nearestDistance = Number.POSITIVE_INFINITY;
          for (const zone of zoneSnapshot) {
            const zx = (zone.x / 100) * WORLD_WIDTH;
            const zy = (zone.y / 100) * WORLD_HEIGHT + 70;
            const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, zx, zy);
            if (d < 115 && d < nearestDistance) {
              nearby = zone.id;
              nearestDistance = d;
            }
          }

          if (nearby !== this.lastNearbyId) {
            this.lastNearbyId = nearby;
            onNearbyZone(nearby);
          }

          if (this.targetZoneId && nearby === this.targetZoneId) {
            this.target.set(this.player.x, this.player.y);
          }
        }
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        width: hostRef.current.clientWidth || 960,
        height: hostRef.current.clientHeight || 640,
        backgroundColor: "#180f21",
        transparent: false,
        render: {
          antialias: true,
          pixelArt: false,
          roundPixels: false,
        },
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: "100%",
          height: "100%",
        },
        scene: [KingdomScene],
      });
    };

    void boot();

    return () => {
      cancelled = true;
      onNearbyZone(null);
      if (game) game.destroy(true);
    };
  }, [learnerName, zonesKey, onNearbyZone, onSelectZone, zones]);

  return <div ref={hostRef} className="kingdom-phaser-host" aria-label="Interactive Hands Gifted Kingdom Academy game world" />;
}

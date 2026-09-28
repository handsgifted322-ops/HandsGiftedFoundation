import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ActivityFinder } from "../../components/ActivityFinder";
import "../activities.css";

export const metadata: Metadata = { title: "Family Activities | Hands Gifted", description: "Free, practical learning activities for children and families, with supplies, steps, conversation prompts, and scripture connections." };

export default function ActivitiesPage() {
  return <main><SiteHeader /><section className="activity-hero"><span>Free family activities</span><h1>Choose something to learn and do together.</h1><p>Find an activity for your child&apos;s age and interests. Every activity gives you supplies, steps, a family conversation, and a scripture connection you can explore in context.</p></section><section className="activity-shell"><ActivityFinder /><div className="activity-parent-note"><h2>For parents and caregivers</h2><p>Start with what your child enjoys. Adjust each activity to their ability, supervise tools and kitchen work, and treat the suggested ages as a guide. The goal is a useful shared experience, not a test.</p><a href="/academy">Explore the Hands Gifted Academy →</a></div></section><SiteFooter /></main>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { ActivityActions } from "../../../components/ActivityActions";
import { activities, getActivity } from "../../../lib/activities";
import "../../activities.css";

export function generateStaticParams() { return activities.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const activity = getActivity((await params).slug);
  return { title: activity ? `${activity.title} | Hands Gifted` : "Activity | Hands Gifted", description: activity?.summary };
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const activity = getActivity((await params).slug);
  if (!activity) notFound();
  return <main><SiteHeader /><article className="activity-detail"><a className="activity-back" href="/activities">← All activities</a><header><span>{activity.topic} · Ages {activity.ages} · About {activity.minutes} minutes</span><h1>{activity.title}</h1><p>{activity.summary}</p></header><div className="activity-detail-grid"><div><section><h2>What you need</h2><ul>{activity.supplies.map((supply) => <li key={supply}>{supply}</li>)}</ul></section><section className="activity-safety"><h2>Adult guidance</h2><p>{activity.safety}</p></section></div><div><section><h2>Do it together</h2><ol>{activity.steps.map((step) => <li key={step}>{step}</li>)}</ol></section><section><h2>Talk together</h2><ul>{activity.conversation.map((question) => <li key={question}>{question}</li>)}</ul></section></div></div><section className="activity-faith"><span>Faith in daily life</span><h2>{activity.faith.reference}</h2><p>{activity.faith.connection}</p><strong>{activity.faith.question}</strong></section><section className="activity-next"><h2>Keep going</h2><p>{activity.next}</p></section><ActivityActions slug={activity.slug} /><a className="activity-back" href="/activities">← Find another activity</a></article><SiteFooter /></main>;
}

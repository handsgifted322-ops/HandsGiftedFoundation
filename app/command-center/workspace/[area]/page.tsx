import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accessMessage, getCommandAccess } from "../../_lib/access";
import dash from "../../dashboard/dashboard.module.css";
import styles from "./workspace.module.css";

export const metadata: Metadata = {
  title: "Focus Workspace | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type AreaConfig = {
  icon: string;
  title: string;
  subtitle: string;
  operatorHref: string;
  tabs: { slug: string; label: string; description: string }[];
};

const areas: Record<string, AreaConfig> = {
  spiritual: {
    icon: "📖", title: "Spiritual Foundation", subtitle: "Bible · Prayer · Sabbath · Study", operatorHref: "/command-center/more",
    tabs: [
      {slug:"overview",label:"Overview",description:"See the spiritual lane without leaving Focus View."},
      {slug:"today",label:"Today",description:"Keep today’s prayer, study and Sabbath responsibilities visible."},
      {slug:"prayer-bible",label:"Prayer & Bible",description:"Open the prayer and Scripture lane."},
      {slug:"sabbath-holy-days",label:"Sabbath & Holy Days",description:"Keep preparation and observance items together."},
      {slug:"study-notes",label:"Study Notes",description:"Review saved study material and follow-up items."},
    ],
  },
  household: {
    icon:"🏠",title:"Household",subtitle:"Home · Meals · Routines · Family care",operatorHref:"/command-center/household",
    tabs:[
      {slug:"overview",label:"Overview",description:"See household responsibilities in one place."},
      {slug:"today",label:"Today",description:"Surface only what needs attention today."},
      {slug:"meals",label:"Meals",description:"Move into food and meal operations."},
      {slug:"routines",label:"Routines",description:"Review household routines and playbooks."},
      {slug:"family-care",label:"Family Care",description:"See family-care follow-ups and needs."},
    ],
  },
  executive: {
    icon:"💼",title:"Executive",subtitle:"Schedule · Email · Tasks · Follow-ups",operatorHref:"/command-center/inbox",
    tabs:[
      {slug:"overview",label:"Overview",description:"See the executive support lane at a glance."},
      {slug:"today",label:"Today",description:"Keep today’s administrative actions in front."},
      {slug:"inbox",label:"Inbox",description:"Move into triage and communication work."},
      {slug:"calendar",label:"Calendar",description:"Review scheduled commitments and deadlines."},
      {slug:"follow-ups",label:"Follow-ups",description:"See waiting items and next contacts."},
    ],
  },
  "hands-gifted-ceo": {
    icon:"♛",title:"Hands Gifted CEO",subtitle:"Projects · Programs · Content · Business",operatorHref:"/command-center/projects",
    tabs:[
      {slug:"overview",label:"Overview",description:"See the active business lane without opening the workbench."},
      {slug:"today",label:"Today",description:"Surface today’s CEO actions only."},
      {slug:"projects",label:"Projects",description:"Review current active-business projects."},
      {slug:"content",label:"Content",description:"See content and publishing decisions."},
      {slug:"website",label:"Website",description:"Move into current website work."},
    ],
  },
  stability: {
    icon:"🛡",title:"Family Stability",subtitle:"Housing · Utilities · Transportation · Needs",operatorHref:"/command-center/operations",
    tabs:[
      {slug:"overview",label:"Overview",description:"Keep stability work visible without mixing it into business."},
      {slug:"today",label:"Today",description:"See the stability items that need action today."},
      {slug:"housing",label:"Housing",description:"Open housing and rent-related work."},
      {slug:"transportation",label:"Transportation",description:"Review mobility and transportation needs."},
      {slug:"needs",label:"Needs",description:"See unresolved household needs."},
    ],
  },
  academy: {
    icon:"🎓",title:"Family Academy",subtitle:"Learning · Assignments · Progress · Skills",operatorHref:"/command-center/academy",
    tabs:[
      {slug:"overview",label:"Overview",description:"See the Family Academy lane in Focus View."},
      {slug:"today",label:"Today",description:"Surface today’s learning responsibilities."},
      {slug:"assignments",label:"Assignments",description:"Review active assignments."},
      {slug:"progress",label:"Progress",description:"Review progress and parent checks."},
      {slug:"skills",label:"Skills",description:"See skill-development lanes."},
    ],
  },
  "children-school": {
    icon:"🎒",title:"Children & School",subtitle:"Schedules · Assignments · Events · Supplies",operatorHref:"/command-center/academy",
    tabs:[
      {slug:"overview",label:"Overview",description:"Keep school operations separate and easy to scan."},
      {slug:"today",label:"Today",description:"See today’s school follow-ups."},
      {slug:"schoolwork",label:"Schoolwork",description:"Review assignments and academic work."},
      {slug:"events",label:"Events",description:"See school events and dates."},
      {slug:"supplies",label:"Supplies",description:"Review school-supply needs."},
    ],
  },
  "food-kitchen": {
    icon:"🍴",title:"Food & Kitchen",subtitle:"Meals · Prep · Inventory · Grocery systems",operatorHref:"/command-center/household",
    tabs:[
      {slug:"overview",label:"Overview",description:"See food operations without opening the full workbench."},
      {slug:"today",label:"Today",description:"Surface today’s meals, prep and use-first items."},
      {slug:"meal-plan",label:"Meal Plan",description:"Review planned meals."},
      {slug:"inventory",label:"Inventory",description:"See food inventory and low items."},
      {slug:"grocery",label:"Grocery",description:"Review grocery actions and shopping lists."},
    ],
  },
  "home-management": {
    icon:"🧹",title:"Home Management",subtitle:"Cleaning · Laundry · Repairs · Organization",operatorHref:"/command-center/household",
    tabs:[
      {slug:"overview",label:"Overview",description:"See home operations in the same dark Focus View."},
      {slug:"today",label:"Today",description:"Surface today’s home reset work."},
      {slug:"cleaning",label:"Cleaning",description:"Review cleaning zones and routines."},
      {slug:"laundry",label:"Laundry",description:"Review laundry priorities."},
      {slug:"repairs",label:"Repairs",description:"See repair, pest and maintenance items."},
    ],
  },
  inventory: {
    icon:"📦",title:"Inventory Center",subtitle:"Needs · Low items · Household supplies",operatorHref:"/command-center/operations",
    tabs:[
      {slug:"overview",label:"Overview",description:"See low-stock signals and inventory lanes."},
      {slug:"today",label:"Today",description:"Surface inventory actions due today."},
      {slug:"low-stock",label:"Low Stock",description:"See items that need replenishment."},
      {slug:"household",label:"Household",description:"Review household supplies."},
      {slug:"food",label:"Food",description:"Move into the food inventory lane."},
    ],
  },
  communications: {
    icon:"✉",title:"Communication Hub",subtitle:"Email · Messages · Alerts · Follow-ups",operatorHref:"/command-center/inbox",
    tabs:[
      {slug:"overview",label:"Overview",description:"See communication signals without opening triage."},
      {slug:"today",label:"Today",description:"Surface messages that need action today."},
      {slug:"email",label:"Email",description:"Move into email-related work."},
      {slug:"messages",label:"Messages",description:"Review other communication signals."},
      {slug:"follow-ups",label:"Follow-ups",description:"See waiting and follow-up items."},
    ],
  },
  website: {
    icon:"🖥",title:"Website Development",subtitle:"Content · Design · Pages · Deployment",operatorHref:"/command-center/projects",
    tabs:[
      {slug:"overview",label:"Overview",description:"See website work in Focus View."},
      {slug:"today",label:"Today",description:"Surface only today’s website actions."},
      {slug:"pages",label:"Pages",description:"Review page-level work."},
      {slug:"content",label:"Content",description:"Review website content decisions."},
      {slug:"deployment",label:"Deployment",description:"See deployment and domain work."},
    ],
  },
};

export default async function FocusWorkspace({params,searchParams}:{params:Promise<{area:string}>;searchParams:Promise<{tab?:string}>}){
  const access=await getCommandAccess();
  if(access.state!=="ready"){
    const msg=accessMessage(access.state);
    return <div className={dash.dash}><section className={dash.access}><h1>{msg.title}</h1><p>{msg.body}</p><p><Link href="/">Return to Hands Gifted</Link></p></section></div>;
  }

  const {area}=await params;
  const query=await searchParams;
  const config=areas[area];
  if(!config) notFound();
  const current=config.tabs.find(tab=>tab.slug===query.tab)??config.tabs[0];

  return <div className={dash.dash}>
    <header className={dash.topbar}>
      <Link href="/command-center/dashboard" className={styles.brandLink}><div className={dash.brand}><div className={dash.crown}>♛</div><div className={dash.brandCopy}><strong>HANDS GIFTED</strong><span>Focus View</span></div></div></Link>
      <div className={styles.viewSwitch}><span className={styles.viewActive}>Focus View</span><Link href={config.operatorHref}>Operator View</Link></div>
      <div className={dash.profile}><div className={dash.profileDot}>S</div><div className={dash.profileText}><strong>Shayla</strong><span>{config.title}</span></div></div>
    </header>

    <div className={dash.layout}>
      <aside className={dash.sidebar}>
        <div className={dash.navLabel}>Focus View</div>
        <Link className={dash.navLink} href="/command-center/dashboard"><span className={dash.navIcon}>☀</span>My Day</Link>
        <Link className={`${dash.navLink} ${dash.navActive}`} href={`/command-center/workspace/${area}`}><span className={dash.navIcon}>{config.icon}</span>{config.title}</Link>
        <Link className={dash.navLink} href="/command-center/calendar"><span className={dash.navIcon}>□</span>Calendar</Link>
        <Link className={dash.navLink} href="/command-center/inbox"><span className={dash.navIcon}>✉</span>Inbox</Link>
        <Link className={dash.navLink} href="/command-center/more"><span className={dash.navIcon}>☰</span>More</Link>
      </aside>

      <main className={dash.main}>
        <section className={styles.hero}>
          <div className={styles.heroIcon}>{config.icon}</div>
          <div><span className={styles.eyebrow}>Focus workspace</span><h1>{config.title}</h1><p>{config.subtitle}</p></div>
          <Link className={styles.operatorButton} href={config.operatorHref}>Open Operator View →</Link>
        </section>

        <nav className={styles.tabs} aria-label={`${config.title} focus tabs`}>
          {config.tabs.map(tab=><Link key={tab.slug} className={`${styles.tab} ${tab.slug===current.slug?styles.tabActive:""}`} href={`/command-center/workspace/${area}?tab=${tab.slug}`}>{tab.label}</Link>)}
        </nav>

        <section className={styles.focusPanel}>
          <div className={styles.panelHead}><div><span>{config.title}</span><h2>{current.label}</h2></div><Link href="/command-center/dashboard">← Back to My Day</Link></div>
          <p className={styles.panelLead}>{current.description}</p>
          <div className={styles.ruleCard}><strong>How this view works</strong><p>Focus View is for seeing and moving through the area without dropping into raw administration. When you need to enter, edit, triage, assign or manage records, switch to Operator View. Both views stay inside the same Hands Gifted dark interface.</p></div>
        </section>

        <section className={styles.nextGrid}>
          <Link href="/command-center/dashboard" className={styles.nextCard}><span>01</span><strong>My Day</strong><p>Return to the main command view.</p></Link>
          <Link href={config.operatorHref} className={styles.nextCard}><span>02</span><strong>Operator View</strong><p>Enter or manage the underlying records.</p></Link>
          <Link href="/command-center/calendar" className={styles.nextCard}><span>03</span><strong>Calendar</strong><p>Check scheduled work and deadlines.</p></Link>
        </section>
      </main>
    </div>

    <nav className={dash.mobileNav} aria-label="Focus View navigation">
      <Link href="/command-center/dashboard">☀<span>My Day</span></Link>
      <Link className={dash.mobileActive} href={`/command-center/workspace/${area}`}>{config.icon}<span>Area</span></Link>
      <Link href="/command-center/calendar">□<span>Calendar</span></Link>
      <Link href="/command-center/inbox">✉<span>Inbox</span></Link>
      <Link href="/command-center/more">☰<span>More</span></Link>
    </nav>
  </div>;
}

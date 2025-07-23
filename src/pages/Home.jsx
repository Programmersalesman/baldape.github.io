import React, { useEffect, useState } from "react";
import HeroSectionV2 from "../components/ui/v2/HeroSectionV2";
import StatsRow from "../components/ui/v2/StatsRow";
import FeatureGrid from "../components/ui/v2/FeatureGrid";
import OwnerTestimonialCarousel from "../components/ui/v2/OwnerTestimonialCarousel";
import StepPlan from "../components/ui/v2/StepPlan";
import Modal from '../components/ui/Modal';
import { getPublicTestimonials } from '../services/supabaseTestimonialService';
import { filterTestimonialsByRole } from '../utils/testimonialFilters';
import {
  LightningIcon,
  RobotIcon,
  PaletteIcon,
  ShieldIcon,
  ChartUpIcon,
  ServerIcon,
  UsersIcon,
  OnlineIcon,
  PhoneIcon,
  DocumentIcon,
  RocketIcon,
  WandIcon,
  CalendarIcon,
  ArrowUpIcon,
  GlobeIcon
} from '../components/ui/v2/icons/glyphs';
import { fetchDiscordInviteStats } from '../utils/fetchDiscordInviteStats';
import { servers } from '../data/servers';

const features = [
  { icon: <LightningIcon size={56} />, title: "Pro setup in 24h", desc: "Get your server up and running, fast.", longDesc: "Professional setup in under 24 hours. I handle everything from channel structure to permissions, so you can launch your community quickly and confidently." },
  { icon: <RobotIcon size={56} />, title: "Smart Bots", desc: "Automate moderation, analytics, and engagement.", longDesc: "Custom bots for moderation, analytics, and engagement. Automate repetitive tasks, keep your community safe, and boost activity with smart integrations." },
  { icon: <WandIcon size={56} />, title: "Unique Themes and Roles", desc: "Stand out with unique themes and roles.", longDesc: "Personalized themes and role systems that make your server stand out. Enhance user experience with creative visuals and clear role hierarchies." },
  { icon: <ShieldIcon size={56} />, title: "Ironclad Security", desc: "Keep your community safe from spam and raids.", longDesc: "Advanced anti-spam, anti-raid, and verification systems. Your server stays protected with proactive security and real-time monitoring." },
  { icon: <ChartUpIcon size={56} />, title: "Growth Tools", desc: "Boost onboarding and member retention.", longDesc: "Onboarding flows, analytics, and retention tools to help your community grow. Track progress and keep members engaged from day one." },
  { icon: <GlobeIcon size={56} />, title: "Beyond Discord", desc: "I manage all kinds of online communities, not just Discord!", longDesc: "Expertise in managing all types of online communities—not just Discord. Get help with forums, Telegram, Slack, and more for a unified experience." }
];

const steps = [
  { icon: <CalendarIcon size={36} />, label: "Book a Free Call", desc: "Schedule a quick intro call to discuss your goals and pain points." },
  { icon: <DocumentIcon size={36} />, label: "Get a Custom Plan", desc: "Receive a tailored action plan and transparent quote for your community." },
  { icon: <ArrowUpIcon size={36} />, label: "Launch & Grow!", desc: "Watch your Discord transform and enjoy ongoing support as you grow." }
];

function Home() {
  const [stats, setStats] = useState({ totalMembers: 0, totalServers: servers.length, totalOnlineMembers: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const [ownerTestimonials, setOwnerTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTestimonial, setModalTestimonial] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoadingStats(true);
    const inviteCodes = servers.map(s => (s.inviteUrl || '').split('/').pop());
    fetchDiscordInviteStats(inviteCodes).then(data => {
      if (!mounted) return;
      setStats({
        totalMembers: data.totalMembers,
        totalServers: data.totalServers,
        totalOnlineMembers: data.totalOnlineMembers
      });
      setLoadingStats(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    getPublicTestimonials().then(res => {
      if (res.success) {
        // Only show owner/admin testimonials
        const owners = filterTestimonialsByRole(res.testimonials, 'admin');
        setOwnerTestimonials(owners);
      }
    });
  }, []);

  const statsRowData = [
    { label: "Servers Managed", value: loadingStats ? "..." : stats.totalServers, icon: <ServerIcon size={48} color="#ef4444" />, accent: "#ef4444", bg: "linear-gradient(135deg, #23272a 60%, #ef4444 100%)", accentHover: "#f87171" },
    { label: "Total Members", value: loadingStats ? "..." : stats.totalMembers, icon: <UsersIcon size={48} color="#facc15" />, accent: "#facc15", bg: "linear-gradient(135deg, #23272a 60%, #facc15 100%)", accentHover: "#fde047" },
    { label: "Currently Live", value: loadingStats ? "..." : stats.totalOnlineMembers, icon: <OnlineIcon size={48} color="#43e97b" />, accent: "#43e97b", bg: "linear-gradient(135deg, #23272a 60%, #43e97b 100%)", accentHover: "#6ee7b7" }
  ];

  // Handler for tapping a testimonial
  const handleTestimonialClick = (testimonial) => {
    setModalTestimonial(testimonial);
    setModalOpen(true);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      <HeroSectionV2
        title="Discord, Done Right"
        subtitle="Modern, scalable, and beautiful Discord communities—built for growth, engagement, and peace of mind."
        ctaButtons={[
          { label: "Book Free Call", onClick: () => window.location.href = '/contact', variant: 'primary' },
          { label: "See Portfolio", onClick: () => window.location.href = '/portfolio', variant: 'secondary' }
        ]}
        imageSrc="https://cdn.pixabay.com/photo/2017/01/10/19/05/discord-1971386_1280.png"
      />
      <StatsRow stats={statsRowData.map(s => ({ ...s, style: { '--accent': s.accent, '--card-bg': s.bg, '--accent-hover': s.accentHover } }))} />
      <FeatureGrid features={features} />
      <OwnerTestimonialCarousel testimonials={ownerTestimonials} onTestimonialClick={handleTestimonialClick} />
      <StepPlan steps={steps} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth={500}>
        {modalTestimonial && (() => {
          let avatarSrc = modalTestimonial.profilePic || modalTestimonial.avatar;
          const isCapCommunity = (modalTestimonial.community || '').toLowerCase() === 'cantstopthecaptv';
          const isAdmin = (modalTestimonial.role || '').toLowerCase().includes('admin') || modalTestimonial.isAdminReview;
          if (isCapCommunity && isAdmin) {
            avatarSrc = '/images/cap.png';
          }
          const server = servers.find(s => s.name.toLowerCase() === (modalTestimonial.community || '').toLowerCase());
          const badgeColor = server?.color || '#aaa';
          const badgeLabel = server?.name || modalTestimonial.community || 'Server';
          const inviteUrl = server?.inviteUrl;
          const roleLabel = modalTestimonial.role ? modalTestimonial.role.charAt(0).toUpperCase() + modalTestimonial.role.slice(1).toLowerCase() : '';
          return (
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <img src={avatarSrc} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{modalTestimonial.author || modalTestimonial.name}</div>
                  <div style={{ color: '#888', fontSize: 14 }}>
                    {inviteUrl ? (
                      <a
                        href={inviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          background: badgeColor,
                          color: '#fff',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '2px 10px',
                          marginRight: 8,
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                      >
                        {badgeLabel}
                      </a>
                    ) : (
                      <span style={{
                        display: 'inline-block',
                        background: badgeColor,
                        color: '#fff',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '2px 10px',
                        marginRight: 8
                      }}>{badgeLabel}</span>
                    )}
                    <span style={{ fontWeight: 600 }}>{roleLabel}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 16, marginBottom: 16 }}>{modalTestimonial.text}</div>
              <div style={{ color: '#f2c94c', fontSize: 22 }}>
                {[1,2,3,4,5].map(star => (
                  <span key={star} style={{ opacity: star <= (modalTestimonial.rating || 0) ? 1 : 0.3 }}>★</span>
                ))}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}

export default Home;

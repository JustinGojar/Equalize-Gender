import {
  Accessibility,
  AlertTriangle,
  BookOpen,
  Brain,
  Briefcase,
  Globe,
  Heart,
  MessageCircle,
  Scale,
  Shield,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  shield: Shield,
  alert: AlertTriangle,
  brain: Brain,
  wallet: Wallet,
  users: Users,
  globe: Globe,
  scale: Scale,
  heart: Heart,
  book: BookOpen,
  briefcase: Briefcase,
  sparkles: Sparkles,
  message: MessageCircle,
  accessibility: Accessibility,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}

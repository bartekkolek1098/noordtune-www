import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Cpu,
  FileText,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
  ScanLine
} from "lucide-react";
import type {IconName} from "@/content/copy";

const icons: Record<IconName, LucideIcon> = {
  gauge: Gauge,
  cpu: Cpu,
  shield: ShieldCheck,
  chart: BarChart3,
  wrench: Wrench,
  scan: ScanLine,
  turbo: Zap,
  truck: Truck,
  users: Users,
  map: MapPin,
  phone: Phone,
  calendar: CalendarDays,
  check: CheckCircle2,
  file: FileText,
  spark: Sparkles
};

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({name, className}: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={1.8} />;
}

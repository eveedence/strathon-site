import type { Metadata } from "next";
import DesignGuide from "@/design-system/guide";
export const metadata: Metadata = { title: "Eveedence — Design System", robots: { index: false, follow: false } };
export default function DesignSystemPage() { return <DesignGuide />; }

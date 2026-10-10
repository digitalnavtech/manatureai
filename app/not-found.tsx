import Link from "next/link";
import { Container } from "@/components/ui/Container";
export default function NotFound() { return <main className="not-found"><Container><span className="eyebrow">404 • Off the trail</span><h1>Nothing is nesting here.</h1><p>The page may have moved, or it may still be waiting to be written.</p><Link className="button-primary" href="/">Return home</Link></Container></main>; }

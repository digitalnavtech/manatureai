import { Button } from "@/components/ui/Button";
import { SponsoredLabel } from "./SponsoredLabel";

/**
 * Promotes a future paid digital travel guide (PDF / ebook). Swap the href
 * for a real checkout link once the product exists.
 */
export function GuidePromo() {
  return (
    <div className="rounded-2xl border border-forest/20 bg-forest p-6 text-paper sm:p-8">
      <SponsoredLabel className="border-paper/30 bg-paper/10 text-paper" />
      <h2 className="mt-3 font-display text-2xl">The Complete Helsinki Guide (PDF)</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/85">
        A downloadable, offline-ready itinerary planner with maps, our favourite hidden spots and
        a printable checklist — coming soon.
      </p>
      <div className="mt-6">
        <Button href="/contact" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-forest">
          Get notified when it launches
        </Button>
      </div>
    </div>
  );
}

import { AffiliateButton } from "./AffiliateButton";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

interface BookingLinksProps {
  destinationName: string;
}

/**
 * Placeholder monetization block for hotel, tour and insurance affiliate
 * links. Replace the `href` values with real partner links (e.g. Booking.com,
 * GetYourGuide, SafetyWing) once affiliate accounts are set up.
 */
export function BookingLinks({ destinationName }: BookingLinksProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-display text-lg text-ink">Plan your stay in {destinationName}</h2>
      <div className="mt-4 space-y-3">
        <AffiliateButton
          label={`Find hotels in ${destinationName}`}
          provider="Booking partner"
          href="#affiliate-placeholder-hotels"
        />
        <AffiliateButton
          label={`Browse tours & activities near ${destinationName}`}
          provider="Tours partner"
          href="#affiliate-placeholder-tours"
        />
        <AffiliateButton
          label="Compare travel insurance for Finland"
          provider="Insurance partner"
          href="#affiliate-placeholder-insurance"
        />
      </div>
      <div className="mt-4">
        <AffiliateDisclosure compact />
      </div>
    </div>
  );
}

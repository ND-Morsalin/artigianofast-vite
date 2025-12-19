
import { useState } from "react";
import PromoSpotList from "./PromoSpotList";
import PromoSpotForm from "./PromoSpotForm";
import type { PromotionalSpot } from "../../types";

export default function PromoSpotPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [selectedSpot, setSelectedSpot] = useState<PromotionalSpot | undefined>(
    undefined
  );

  // const handleNewSpot = () => {
  //   setSelectedSpot(undefined);
  //   setView("form");
  // };

  const handleEditSpot = (spot: PromotionalSpot) => {
    setSelectedSpot(spot);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
    setSelectedSpot(undefined);
  };

  return (
    <div className="container mx-auto p-4">
      {view === "list" ? (
        <PromoSpotList onEdit={handleEditSpot} />
      ) : (
        <PromoSpotForm spot={selectedSpot} onCancel={handleCancel} />
      )}
    </div>
  );
}

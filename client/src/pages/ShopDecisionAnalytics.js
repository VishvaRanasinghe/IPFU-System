import React from "react";
import StatGrid from "../components/StatGrid";
import DDchart from "../components/DDchart";
import YsalesP from "../components/YsalesP";
import DecisionView from "../components/DecisionView";

function ShopDecisionAnalytics() {
  return (
    <div className="flex gap-4 flex-col">
      <StatGrid />
      <div className="flex gap-4 flex-row w-full">
        <DDchart />
        <YsalesP />
      </div>
      <div className="flex gap-4 flex-row w-full">
        <DecisionView />
      </div>
    </div>
  );
}

export default ShopDecisionAnalytics;

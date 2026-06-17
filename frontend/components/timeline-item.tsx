import { ProLaxText, ProLaxHtml } from "./pro-lax";

interface TimelineItemProps {
  side?: "left" | "right";
  proDate: string;
  laxDate: string;
  proTitle: string;
  laxTitle: string;
  proOrg: string;
  laxOrg: string;
  proDesc: string;
  laxDesc: string;
}

export function TimelineItem({
  side = "right",
  proDate,
  laxDate,
  proTitle,
  laxTitle,
  proOrg,
  laxOrg,
  proDesc,
  laxDesc,
}: TimelineItemProps) {
  return (
    <div className={`timeline-item timeline-item-${side}`}>
      <div className="timeline-item-content">
        <h3>
          <ProLaxText pro={proTitle} lax={laxTitle} />
        </h3>
        <span className="timeline-date">
          <ProLaxText pro={proDate} lax={laxDate} />
        </span>
        <p className="timeline-org">
          <ProLaxText pro={proOrg} lax={laxOrg} />
        </p>
        <div className="timeline-desc">
          <ProLaxHtml pro={proDesc} lax={laxDesc} />
        </div>
      </div>
    </div>
  );
}

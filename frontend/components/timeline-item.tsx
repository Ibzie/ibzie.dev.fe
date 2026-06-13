import { ProLaxText } from "./pro-lax";

interface TimelineItemProps {
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
    <div className="timeline-item">
      <span className="timeline-date">
        <ProLaxText pro={proDate} lax={laxDate} />
      </span>
      <h3>
        <ProLaxText pro={proTitle} lax={laxTitle} />
      </h3>
      <p className="timeline-org">
        <ProLaxText pro={proOrg} lax={laxOrg} />
      </p>
      <p className="timeline-desc">
        <ProLaxText pro={proDesc} lax={laxDesc} />
      </p>
    </div>
  );
}

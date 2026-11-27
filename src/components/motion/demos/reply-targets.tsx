import { DemoFrame, demoAtoms as f, type DemoProps } from "./frame";
import s from "./reply-targets.module.css";

const LABEL = "fresh posts from your niche ranked so you can reply early; you approve every reply.";

/** AI Reply Assistant: the post that is taking off rises to the top and gets a Reply button. */
export function DemoReplyTargets(props: DemoProps) {
  return (
    <DemoFrame title="GrowX · AI Creator Studio" label={LABEL} {...props}>
      <div className={f.head}>
        <span className={f.headTitle}>AI Reply Assistant</span>
        <span className={f.chip}>Younger than 120 min</span>
      </div>
      <div className={s.list}>
        <div className={`${s.card} ${s.hot}`}>
          <span className={f.avatar}>EV</span>
          <span className={f.lines}>
            <span className={f.skel} style={{ width: "80%" }} />
            <span className={f.skel} style={{ width: "46%" }} />
          </span>
          <span className={`${f.chip} ${f.chipAccent} ${f.hideSm}`}>taking off</span>
          <span className={`${f.chip} ${f.mono} ${s.age}`}>11 min</span>
          <span className={s.reply}>Reply</span>
        </div>
        <div className={`${s.card} ${s.second}`}>
          <span className={f.avatar}>NB</span>
          <span className={f.lines}>
            <span className={f.skel} style={{ width: "70%" }} />
            <span className={f.skel} style={{ width: "38%" }} />
          </span>
          <span className={`${f.chip} ${f.mono} ${s.age}`}>4 min</span>
        </div>
        <div className={`${s.card} ${f.hideSm}`}>
          <span className={f.avatar}>IQ</span>
          <span className={f.lines}>
            <span className={f.skel} style={{ width: "64%" }} />
            <span className={f.skel} style={{ width: "50%" }} />
          </span>
          <span className={`${f.chip} ${f.mono} ${s.age}`}>26 min</span>
        </div>
      </div>
      <p className={f.foot}>You approve every reply. GrowX never replies by itself.</p>
    </DemoFrame>
  );
}

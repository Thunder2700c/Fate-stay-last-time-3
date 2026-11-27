import type { ReactNode } from "react";

type Children={children?:ReactNode};
export function SocialPost({platform="SOCIAL FEED",author="PUBLIC ACCOUNT",caption,views,shares,reactions="😂  💀  ❤️"}:{platform?:string;author?:string;caption:string;views?:string;shares?:string;reactions?:string}){
  return <figure className="story-social-post" aria-label={`In-story ${platform} post`}>
    <div className="social-post-top"><span className="social-avatar">{author.slice(0,1).toUpperCase()}</span><span className="social-author"><strong>{author}</strong><small>{platform} <i>·</i> PUBLIC POST</small></span><span className="social-menu">•••</span></div>
    <div className="social-post-caption">{caption}</div>
    <div className="social-post-reactions"><span>{reactions}</span><small>REACTIONS</small></div>
    <div className="social-post-stats">{views&&<span><b>{views}</b> VIEWS</span>}{shares&&<span><b>SHARED TO</b> {shares}</span>}</div>
    <div className="social-post-actions"><span>♡ LIKE</span><span>◯ COMMENT</span><span>↗ SHARE</span></div>
    <figcaption>ARCHIVED SCREEN / STORY INTERFACE</figcaption>
  </figure>;
}
export function MessageThread({title="MESSAGES",platform="CHAT",status="GROUP CONVERSATION",children}:Children&{title?:string;platform?:string;status?:string}){
  return <section className="story-message-thread" aria-label={title}><header><span className="message-app-mark">◉</span><span><strong>{title}</strong><small>{platform} <i>·</i> {status}</small></span><b>•••</b></header><div className="message-thread-body">{children}</div><div className="message-thread-foot">END-TO-END CONVERSATION <span>●</span></div></section>;
}
export function MessageBubble({children,from="incoming",author="CONTACT",time}:{children:ReactNode;from?:"incoming"|"outgoing";author?:string;time?:string}){
  return <div className={`message-line ${from==="outgoing"?"message-outgoing":"message-incoming"}`}><small>{author}</small><div className="message-bubble">{children}{time&&<time>{time}</time>}</div></div>;
}
export function LiveChat({children,title="LIVE CHAT"}:Children&{title?:string}){
  return <section className="story-live-chat" aria-label={title}><header><span className="live-indicator"/> <strong>{title}</strong><span className="live-label">LIVE</span></header><div className="live-chat-body">{children}</div><footer>MESSAGES APPEAR AS THE STREAM UNFOLDS</footer></section>;
}
export function ChatLine({children,author="VIEWER"}:Children&{author?:string}){
  return <p className="live-chat-line"><b>{author}</b><span>{children}</span></p>;
}
export function StoryImage({src,alt,caption,credit="Unsplash"}:{src:string;alt:string;caption?:string;credit?:string}){
  return <figure className="story-image"><img src={src} alt={alt} loading="lazy" decoding="async"/>{(caption||credit)&&<figcaption>{caption&&<span>{caption}</span>}<small>IMAGE: {credit}</small></figcaption>}</figure>;
}

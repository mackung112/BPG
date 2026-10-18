import React from 'react';

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  channelName: string;
  channelAvatarUrl: string;
  views: string;
  uploadedAt: string;
  isVerified?: boolean;
  onWatchLater?: (id: string) => void;
  onClick?: (id: string) => void;
}

/**
 * VideoCard Component (Content-first design)
 * Raw thumbnail + text stack without card container or shadows, adhering to design.md & agents.md
 */
export const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnailUrl,
  duration,
  channelName,
  channelAvatarUrl,
  views,
  uploadedAt,
  isVerified = false,
  onWatchLater,
  onClick,
}) => {
  return (
    <article
      className="flex flex-col cursor-pointer group focus-within:ring-2 focus-within:ring-secondary focus-within:rounded-lg"
      onClick={() => onClick?.(id)}
    >
      {/* Thumbnail Container (16:9 Aspect Ratio with 12px Radius) */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface">
        <img
          src={thumbnailUrl}
          alt={`ภาพขนาดย่อวิดีโอ: ${title}`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />

        {/* Duration Badge Bottom-Right */}
        <span
          className="absolute bottom-1 right-1 px-1 py-0.5 rounded-xs bg-black/60 text-text-inverse font-body font-medium text-metadata"
          aria-label={`ความยาววิดีโอ ${duration}`}
        >
          {duration}
        </span>

        {/* Watch Later Hover Action Button (Top-Right) */}
        {onWatchLater && (
          <button
            type="button"
            aria-label="ดูภายหลัง"
            onClick={(e) => {
              e.stopPropagation();
              onWatchLater(id);
            }}
            className="absolute top-1 right-1 p-1 rounded-sm bg-text-primary text-text-inverse opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-neutral focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
            </svg>
          </button>
        )}
      </div>

      {/* Video Information Stack */}
      <div className="flex mt-1.5 gap-1.5">
        {/* Channel Avatar (36px circle) */}
        <div className="flex-shrink-0">
          <img
            src={channelAvatarUrl}
            alt={`รูปช่อง ${channelName}`}
            className="w-9 h-9 rounded-full object-cover bg-surface"
            loading="lazy"
          />
        </div>

        {/* Title & Metadata Details */}
        <div className="flex flex-col flex-grow min-w-0">
          {/* Video Title: Strict 2-line clamp, weight 500, 14px/20px */}
          <h3
            className="font-body text-video-title font-medium text-text-primary line-clamp-2 leading-tight group-hover:text-text-primary"
            title={title}
          >
            {title}
          </h3>

          {/* Channel Name */}
          <div className="flex items-center mt-0.5 text-metadata text-text-secondary">
            <span className="truncate hover:text-text-primary transition-colors">
              {channelName}
            </span>
            {isVerified && (
              <svg
                className="w-3.5 h-3.5 ml-0.5 text-status-success flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="ช่องที่ได้รับการยืนยัน"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )}
          </div>

          {/* Metadata: views dot date */}
          <p className="text-metadata text-text-secondary mt-0.5">
            <span>{views} views</span>
            <span className="mx-0.5">•</span>
            <span>{uploadedAt}</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;

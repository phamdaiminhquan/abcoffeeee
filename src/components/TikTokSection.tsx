import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface TikTokSectionProps {
  videoUrls?: string[];
}

interface TikTokItem {
  id: string;
  embedUrl: string;
  originalUrl: string;
  username?: string;
  label: string;
}

const DEFAULT_TIKTOK_URLS: string[] = [
  'https://www.tiktok.com/@phamdaiminhquan/video/7183560487106252058?_r=1&_t=ZS-91OPcR3W1gH',
  'https://www.tiktok.com/@phamdaiminhquan/video/7170287020118396186?_r=1&_t=ZS-91OPi0PgNWb',
  'https://www.tiktok.com/@phamdaiminhquan/video/7225064022821965061?_r=1&_t=ZS-91OPmSGfhdh',
  'https://www.tiktok.com/@phamdaiminhquan/video/7225064022821965061?_r=1&_t=ZS-91OPmSGfhdh',
  'https://www.tiktok.com/@phamdaiminhquan/video/7225064022821965061?_r=1&_t=ZS-91OPmSGfhdh',
];

const CARD_WIDTH = 320;
const CARD_HEIGHT = 575;
const SCROLL_STEP = CARD_WIDTH + 20;

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

const parseTikTokUrl = (url: string): TikTokItem | null => {
  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.replace('www.', '').replace('m.', '');
    const pathSegments = parsed.pathname.split('/').map((segment) => segment.trim()).filter(Boolean);

    if (!hostname.endsWith('tiktok.com')) {
      return null;
    }

    const videoIndex = pathSegments.findIndex((segment) => segment === 'video');
    if (videoIndex === -1 || videoIndex + 1 >= pathSegments.length) {
      return null;
    }

    const videoId = pathSegments[videoIndex + 1]?.split('?')[0]?.split('#')[0];
    if (!videoId) {
      return null;
    }

    const userSegment = pathSegments.slice(0, videoIndex).find((segment) => segment.startsWith('@'));
    const username = userSegment ? userSegment.replace('@', '') : undefined;

    const canonicalUrl = `https://www.tiktok.com/${userSegment ?? ''}/video/${videoId}`;
    const label = username ? `TikTok vui nhộn của @${username}` : `TikTok vui nhộn #${videoId.slice(0, 4)}`;
    const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}?lang=vi-VN&referrer=cafe-sang`;

    return {
      id: videoId,
      embedUrl,
      originalUrl: canonicalUrl,
      username,
      label,
    };
  } catch (error) {
    console.warn('Không thể phân tích URL TikTok:', url, error);
    return null;
  }
};

interface TikTokCardProps {
  video: TikTokItem;
  index: number;
}

function TikTokCard({ video, index }: TikTokCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className="relative flex-shrink-0"
      style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800 shadow-soft bg-black/5 dark:bg-white/5"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <iframe
          src={video.embedUrl}
          title={video.label}
          scrolling="no"
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
          className="h-full w-full border-0"
          style={{ marginTop: -1 }}
        />
      </div>
    </motion.div>
  );
}

export function TikTokSection({ videoUrls }: TikTokSectionProps) {
  const inputUrls = useMemo(() => {
    if (videoUrls && videoUrls.length > 0) {
      return videoUrls;
    }
    return DEFAULT_TIKTOK_URLS;
  }, [videoUrls]);

  const videos = useMemo(() => {
    return inputUrls.reduce<TikTokItem[]>((acc, url) => {
      const parsed = parseTikTokUrl(url);
      if (parsed) {
        acc.push(parsed);
      }
      return acc;
    }, []);
  }, [inputUrls]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({ canScrollPrev: false, canScrollNext: false });

  const updateScrollState = useCallback(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = node;
    const maxScrollLeft = scrollWidth - clientWidth;

    setScrollState({
      canScrollPrev: scrollLeft > 4,
      canScrollNext: scrollLeft < maxScrollLeft - 4,
    });
  }, []);

  useEffect(() => {
    updateScrollState();

    const node = scrollRef.current;
    if (!node) {
      return;
    }

    node.addEventListener('scroll', updateScrollState, { passive: true });
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);

    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollState]);

  const scrollByStep = useCallback((direction: 'prev' | 'next') => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    const offset = direction === 'prev' ? -SCROLL_STEP : SCROLL_STEP;
    node.scrollBy({ left: offset, behavior: 'smooth' });
  }, []);

  return (
    <motion.section
      className="section-wrap bg-gray-50 dark:bg-gray-950"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-container">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mb-4 shadow-soft"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em]">AB COFFEE</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
            TikTok Vui Nhộn
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ngó qua những clip ngắn tràn đầy năng lượng trên TikTok của chủ quán, nơi câu chuyện thú vị về AB Coffee được kể mỗi ngày.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-8 text-center text-gray-600 dark:text-gray-400">
            Chưa có video TikTok nào được chia sẻ. Hãy quay lại sau nhé!
          </div>
        ) : (
          <div className="relative -mx-4 md:-mx-6 px-4 md:px-6">
            <button
              type="button"
              onClick={() => scrollByStep('prev')}
              disabled={!scrollState.canScrollPrev}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:scale-[1.02] disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              aria-label="Xem video trước"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden={true} />
            </button>

            <button
              type="button"
              onClick={() => scrollByStep('next')}
              disabled={!scrollState.canScrollNext}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:scale-[1.02] disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              aria-label="Xem video tiếp theo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden={true} />
            </button>

            <div
              ref={scrollRef}
              className="tiktok-scroll flex flex-row overflow-x-auto overflow-y-hidden gap-[5px] scroll-smooth snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] pl-4 pr-12 md:pl-8 md:pr-20"
              role="list"
            >
              {videos.map((video, index) => (
                <div key={video.id} className="snap-start" role="listitem">
                  <TikTokCard video={video} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

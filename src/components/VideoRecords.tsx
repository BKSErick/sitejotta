import { Play } from 'lucide-react';
import { useState } from 'react';

import { videoRecords } from '../data/site-content';

/**
 * Facade do YouTube: mostra a thumbnail e só injeta o iframe no clique.
 * Sem isso, cada player carrega centenas de KB e grava cookie de terceiro em
 * todo visitante — inclusive em quem nunca deu play.
 */
function VideoCard({ record }: { record: (typeof videoRecords)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="video-card" data-ratio={record.ratio === '9/16' ? 'vertical' : 'wide'}>
      <div className="video-card__frame">
        {playing ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${record.id}?autoplay=1&rel=0&modestbranding=1`}
            title={record.title}
          />
        ) : (
          <button
            className="video-card__play"
            onClick={() => setPlaying(true)}
            type="button"
          >
            <img alt="" loading="lazy" src={`/media/videos/${record.id}.jpg`} />
            <span className="video-card__badge">
              <Play aria-hidden="true" fill="currentColor" size={18} />
            </span>
            <span className="video-card__duration">{record.duration}</span>
            <span className="sr-only">{`Assistir: ${record.title}`}</span>
          </button>
        )}
      </div>
      <h3>{record.title}</h3>
      <p>{record.description}</p>
    </article>
  );
}

export function VideoRecords() {
  return (
    <div className="video-grid">
      {videoRecords.map((record) => (
        <VideoCard key={record.id} record={record} />
      ))}
    </div>
  );
}

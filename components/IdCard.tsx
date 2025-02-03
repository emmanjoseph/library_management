'use client';

import config from '@/lib/config';
import { IKImage } from 'imagekitio-next';
import React from 'react';

interface IdCardProps {
  src: string;
}
console.log(config.env.imagekit.urlEndPoint);

const IdCard: React.FC<IdCardProps> = ({ src }) => {
  // Construct the full URL using the base URL and the relative path
  const fullImageUrl = `${config.env.imagekit.urlEndPoint}${src}`;

  return (
    <div>
      <IKImage
        src={fullImageUrl} // Full URL using the base endpoint and relative path
        lqip={{ active: true }}
        alt="university card"
        loading="lazy"
        className="rounded-xl object-fill"
      />
    </div>
  );
};

export default IdCard;

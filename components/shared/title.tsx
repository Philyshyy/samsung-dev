import clsx from 'clsx';
import React from 'react';

type TitleSize = 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
  } as const;

  const mapClassNameBySize = {
    sm: 'text-[22px]',
    md: 'text-[30px]',
    lg: 'text-[50px] uppercase',
    xl: 'text-[70px] uppercase',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text,
  );
};
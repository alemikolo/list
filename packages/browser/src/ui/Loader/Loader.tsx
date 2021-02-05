import React, { FC } from 'react';

import { classNames } from 'utils';

import './Loader.scss';

export enum LoaderTheme {
  Danger,
  Dark,
  Light
}

export enum LoaderSize {
  Big,
  Small
}

interface LoaderProps {
  size?: LoaderSize;
  theme?: LoaderTheme;
}

const Loader: FC<LoaderProps> = ({
  size = LoaderSize.Small,
  theme = LoaderTheme.Dark
}) => (
  <div
    className={classNames('loader', {
      'loader--danger': theme === LoaderTheme.Danger,
      'loader--dark': theme === LoaderTheme.Dark,
      'loader--light': theme === LoaderTheme.Light,
      'loader--small': size === LoaderSize.Small,
      'loader--big': size === LoaderSize.Big
    })}
  >
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
    <div className="loader__dot" />
  </div>
);

export default Loader;

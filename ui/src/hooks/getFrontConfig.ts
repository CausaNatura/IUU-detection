import { useCallback, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { FrontendConfig } from 'types/frontConfig';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { doGetFrontConfig } from 'store/slices/frontConfigSlice';
import { SliceStatus } from 'constants/slices';

const GetFrontendConfig = () => {
  const dispatch = useAppDispatch();
  const { config, status: frontConfigStateStatus } = useAppSelector(
    (state) => state.frontConfig
  );
  const [frontendConfig, setFrontendConfig] = useState<FrontendConfig>();

  const getFrontendConfigs = useCallback(() => {
    if (frontConfigStateStatus === SliceStatus.empty) {
      dispatch(doGetFrontConfig());
    } else if (frontConfigStateStatus === SliceStatus.fulfilled) {
      if (config) {
        setFrontendConfig(config);
      } else {
        Sentry.captureMessage(
          'No se pudo cargar la configuración del frontend'
        );
      }
    }
  }, [dispatch, config, frontConfigStateStatus]);

  useEffect(() => {
    getFrontendConfigs();
  }, [getFrontendConfigs]);

  return frontendConfig;
};

export default GetFrontendConfig;

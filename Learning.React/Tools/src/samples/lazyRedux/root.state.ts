import {FeatureFlagState} from '../../shared/domains/featureFlag/featureFlag.state';
import {AbTestState} from '../../shared/domains/abTest/abTest.state';
import {IdState, initialIdState} from '../pagination/ids.state';
import {FakeDomainState} from './fakeDomain.state';

export interface ApplicationState {
  idsState: IdState;
  fakeDomain?: FakeDomainState;
  featureFlags?: FeatureFlagState;
  abTests?: AbTestState;
}

export const initialApplicationState: ApplicationState = {
  idsState: initialIdState,
};

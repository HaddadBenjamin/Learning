import { FakeDomainState } from './fakeDomain.state';
import { FeatureFlagState } from '../../shared/domains/featureFlag/featureFlag.state';
import { AbTestState } from '../../shared/domains/abTest/abTest.state';

export interface ApplicationState {
  fakeDomain?: FakeDomainState;
  featureFlags?: FeatureFlagState;
  abTests?: AbTestState;
}

export const initialApplicationState: ApplicationState = {};

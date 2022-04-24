import { useSelector } from 'react-redux';
import IAuthentificationState, { authentificationInitialState } from '../../domains/authentification/authentification.state';
import selectAuthentification from '../../domains/authentification/authentification.selector';
import useLocalStorage from '../utilities/useLocalStorage';

const useAuthentification = () : IAuthentificationState => {
  const authentificationFromStore = useSelector(selectAuthentification);
  const [authentificationFromLocalStorage] = useLocalStorage('authentification', authentificationInitialState);

  return authentificationFromStore.parsedAccessToken !== undefined ? authentificationFromStore : authentificationFromLocalStorage();
};

export default useAuthentification;

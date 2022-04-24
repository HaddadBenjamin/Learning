import { useSelector } from 'react-redux';
import selectAuthentification from '../authentification.selector';
import IAuthentificationState, { authentificationInitialState } from '../authentification.state';
import useLocalStorage from '../../../hooks/utilities/useLocalStorage';

const useAuthentification = () : IAuthentificationState => {
  const authentificationFromStore = useSelector(selectAuthentification);
  const [authentificationFromLocalStorage] = useLocalStorage('authentification', authentificationInitialState);

  return authentificationFromStore.parsedAccessToken !== undefined ? authentificationFromStore : authentificationFromLocalStorage();
};

export default useAuthentification;

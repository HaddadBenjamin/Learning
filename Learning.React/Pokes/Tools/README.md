**Année de développement :** 2021.</br>

Ensemble de composants et de classes utilitaires telles que :
- Un serveur pour mocker les API de votre projet ce qui est utile lorsque le front a pris de l'avance sur le back ou simplement simuler le back pour proposer une expérience valide en localhost.
- De la gestion de fichiers lazy de sorte à les charger uniquement quand cela est nécéssaire : images responsives ou non, lazy load de réduceur ou de saga, de l'infinite scrolling.
- Un composant highlight pour faciliter vos filtres et vos recherches d'éléments
- Quelques hooks qui permettent de déterminer si un élément ou une ref est visible, faciliter l'utilisation du local storage, redux, l'affichage d'éléments en fonction de breakpoints sur la largeur de l'écran, utiliser une configuration, être alerté quand on clic en dehors d'un composant, utiliser des ab tests ou des features flags.
- > useConfiguration, useBreakpoints, useWhenElementIsVisible, useLazyReducer, useLazySaga, useAbTests, useFeatureFlags, useResponsiveImage, useToggle, useClickOutside, etc...
- Quelques classes utiilitaires : newGuid, randomBetweenRange, removeHtmlTags, sleep, colorizedLog, deepMerge, etc...
> ![Image of Yaktocat](https://imgur.com/unknown.png)

Autres particularités :
- Des linters et un formatteur est configuré (Prettier, EsLint, Stylelint) qui sont lancé avant chaque commit via Husky.
- Une CI est lancée sur Github Action et elle est configurée par le fichier .github/workflows/build_and_test_react.yml
- 

Prérequis pour lancer le projet :
- Sélectionner la version de Node 14.17.0 : Installer NVM > nvm install 14.17.0 > nvm use 14.17.0
import React, {FC} from 'react';
import HorizontalSliderWithReactSlider from "./components/ReactSlick/HorizontalSlider/HorizontalSlider";
import HorizontalSliderCustom from "./components/Custom/components/HorizontalSlider/HorizontalSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App : FC = () => <div>
  <h1>Les règles de l'exercice</h1>
  <ul>
    <li>Afficher une liste d'éléments et pouvoir les parcourir au slide (souris) ou au swipe (doight).</li>
    <li>Afficher uniquement le nombre d'éléments maximum pouvant être affiché et contenu par le conteneur.</li>
    <li>Parcourir de n en n, n étant le nombre d'éléments maximum pouvant être affiché et contenu par le conteneur.</li>
    <li>Afficher des flèches pour les parcourir.</li>
    <li>Afficher des points pours les parcourir uniquement sur mobile.</li>
    <li>Centrer verticalement les éléments dans le conteneur et avoir un léger gap entre vos éléments.</li>
  </ul>
  <HorizontalSliderWithReactSlider/>
  <HorizontalSliderCustom/>
</div>

export default App;

import React from 'react';
import {IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import { Route, Switch, Redirect } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { people, library, triangle, atCircle, heartCircle, cloudCircle, glasses, glassesOutline, libraryOutline, bookOutline } from 'ionicons/icons';

import Autores from '../Autores/Autores';
import Livros from '../Livros/Livros';
import LivroDetalhe from '../Livros/LivroDetalhe/LivroDetalhe';

const TabNavigator: React.FC = () => {
  return (
    <IonPage id="tabNavigation">
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
            <Route path="/" exact={true} render={() => <Redirect to="/autores" />}/>
            <Route path="/autores" component={Autores} exact={true} />
            <Route path="/livros" component={Livros} exact={true} />
            <Route path="/livros/:id" component={LivroDetalhe} />
            <Route path="/home" component={Autores} exact={true} />
          </Switch>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="autores" href="/autores">
            <IonIcon icon={glassesOutline} />
            <IonLabel>Autores</IonLabel>
          </IonTabButton>
          <IonTabButton tab="livros" href="/livros">
            <IonIcon icon={bookOutline} />
            <IonLabel>Livros</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default TabNavigator;

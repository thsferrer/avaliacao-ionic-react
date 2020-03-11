import React from 'react';
import {IonList, IonLabel, IonItem} from '@ionic/react';
import {Author} from '../../../models/Author';
import './ListaAutores.css';

type AutoresListProps = {
  autores: Author[];
}

const ListaAutores: React.FC<AutoresListProps> = ({autores}) => {  
 return (
   <IonList className="lista-autores">
     {autores.map(autor => (
       <IonItem
         key={autor.objectId}
       >
         <IonLabel>{autor.name}</IonLabel>
       </IonItem>
     ))}
   </IonList>
 );
};

export default ListaAutores;

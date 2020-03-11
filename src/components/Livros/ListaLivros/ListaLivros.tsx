import React from "react";
import { Book } from "../../../models/Book";
import { IonList, IonItem, IonAvatar, IonText, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./ListaLivros.css";

type ListaLivrosProps = {
  livros: Book[];
};

const ListaLivros: React.FC<ListaLivrosProps> = ({ livros }) => {

  return (    
    <IonList className="lista-livros">
      {livros.map(livro => (
        <IonItem
          key={livro.objectId}
          routerLink={`/livros/${livro.objectId}`}
        >
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonAvatar>
                  <img src={livro?.cover} alt="Capa do Livro" />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonText className="lista-livros2">{livro.title}</IonText>
              </IonCol>
              <IonCol>
                <IonText className="lista-livros2">
                  {livro.author.name}
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ListaLivros;

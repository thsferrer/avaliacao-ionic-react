import React, { useState, useEffect, useCallback } from "react";
import { IonContent, IonTitle, IonHeader, IonToolbar, IonLoading, IonToast } from "@ionic/react";
import ListaAutores from "./ListaAutores/ListaAutores";
import { AuthorService } from "../../services/AuthorService";
import {Author} from "../../models/Author";

const Autores: React.FC = () => {
  const [autores, setAutores] = useState<Author[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const carregaAutor = useCallback(async () => {
    try {
      setShowLoading(true);
      const listaAutores: Author[] = await AuthorService.getAuthors();
      setAutores(listaAutores);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      setShowToast(true);
    }
  }, []);

  useEffect(() => {
    carregaAutor();
  }, [carregaAutor]);

  return (
    <>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Aguarde, carregando..."}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={"Erro ao tentar carregar autores!"}
        position="bottom"
        duration={3000}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Lista de Autores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark">
        <ListaAutores autores={autores} />
      </IonContent>
    </>
  );
};

export default Autores;

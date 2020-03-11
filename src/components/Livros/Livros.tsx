import React, { useState, useEffect, useCallback } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonToast
} from "@ionic/react";
import {Book} from "../../models/Book";
import {BookService} from '../../services/BookService';
import ListaLivros from './ListaLivros/ListaLivros';

const Livros: React.FC = () => {
  const [livros, setLivros] = useState<Book[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const loadLivros = useCallback(async () => {
    try {
      setShowLoading(true);
      const books: Book[] = await BookService.getBooks();
      setLivros(books);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      setShowToast(true);
    }
  }, []);

  useEffect(() => {
    loadLivros();
  }, [loadLivros]);

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
        message={"Erro ao tentar carregar livros!"}
        position="bottom"
        duration={3000}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Lista de Livros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark">
        <ListaLivros livros={livros} />
      </IonContent>
    </>
  );
};

export default Livros;

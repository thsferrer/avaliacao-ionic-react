import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IonToolbar, IonHeader, IonTitle, IonContent, IonLabel, IonButtons, IonBackButton, IonThumbnail, IonImg, IonCol, IonGrid, IonRow, IonLoading, IonToast } from "@ionic/react";
import { BookService } from "../../../services/BookService";
import { Book } from "../../../models/Book";
import { Review } from "../../../models/Review";
import './LivroDetalhe.css';

const LivroDetalhe: React.FC = (props) => {
  let { id } = useParams();
  const [livro, setLivro] = useState<Book>();
  const [nota, setNota] = useState<String | Number>(0);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const carregarLivro = useCallback(async id => {
    try{
      setShowLoading(true);
      const livroSelecionado: Book = await BookService.getBook(id.toString());
      const reviews: Review[] = await BookService.getReviews(livroSelecionado);

      let notaReview: String | Number;

      if (reviews.length > 0) {
        let valor = 0;
        for (let review of reviews) {
          valor += review.rating;
        }
        notaReview = Math.ceil(valor / reviews.length);
      } 
      else {
        notaReview = "Ainda não existe uma review para este livro!";
      }

      setLivro(livroSelecionado);
      setNota(notaReview);
      setShowLoading(false);
    } 
    catch (erro) {
      setShowLoading(false);
      setShowToast(true);
    }
  }, []);

  useEffect(() => { carregarLivro(id); }, [carregarLivro, id]);

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
        message={"Erro ao tentar carregar livro!"}
        position="bottom"
        duration={3000}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/livros" />
          </IonButtons>
          <IonTitle>{livro?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonThumbnail className="livro-detalhe">
                <IonImg src={livro?.cover} alt="Capa do livro" />
              <IonLabel color="primary">{livro?.title}</IonLabel>
              </IonThumbnail>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Por: {livro?.author.name}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Quantidade disponível: {livro?.quantity}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Nota: {nota} </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default LivroDetalhe;

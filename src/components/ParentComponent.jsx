const ParentComponent = () => {
    const handlePostCreated = (newPost) => {
      console.log('New post created:', newPost);
      // Gestisci la logica per visualizzare il nuovo post nella home
    };
  
    const handleClosePopup = () => {
      console.log('Popup chiuso, tornare alla schermata home');
      // Qui puoi implementare la navigazione alla home
      // Ad esempio: history.push('/home') se stai usando react-router
    };
  
    return (
      <div>
        <h1>Benvenuto nella tua applicazione!</h1>
        <NewPost onPostCreated={handlePostCreated} onClosePopup={handleClosePopup} />
      </div>
    );
  };
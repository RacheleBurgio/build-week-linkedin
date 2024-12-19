/**
 * Funzione per recuperare i dati dell'utente da "https://striveschool-api.herokuapp.com/api/profile/me".
 * - I dati vengono salvati nel localStorage con un timestamp.
 * - Se i dati sono più vecchi di 5 minuti, esegue automaticamente una nuova fetch.
 * - Supporta le azioni 'force' per forzare la fetch e 'delete' per cancellare i dati salvati.
 *
 * @param {string|null} action - (Opzionale) Può essere 'force' per forzare la fetch o 'delete' per cancellare i dati.
 * @returns {Promise<Object|null>} - Restituisce i dati dell'utente o null in caso di errore.
 */
async function getMe(action = null, profileId = null) {
  const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/'
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY // Legge l'API key dalle variabili ambiente
  const localStorageKey = 'me'
  const cacheExpiration = 5 * 60 * 1000 // 5 minuti in millisecondi
  const cachedData = localStorage.getItem(localStorageKey)

  switch (action) {
    case 'delete': {
      // Gestione dell'azione 'delete'
      localStorage.removeItem(localStorageKey)
      console.log('Dati cancellati dal localStorage')
      break
    }
    case 'get': {
      // Esegui la fetch
      try {
        const response = await fetch(apiUrl + localStorageKey, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Errore nella fetch: ${response.status}`)
        }

        const data = await response.json()

        // Aggiungi timestamp alla risposta
        const resultWithTimestamp = {
          ...data,
          timestamp: new Date().toISOString(),
        }

        // Salva i dati aggiornati nel localStorage
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(resultWithTimestamp)
        )
        console.log('Dati aggiornati nel localStorage:', resultWithTimestamp)
        if (cachedData && action !== 'force') {
          const parsedData = JSON.parse(cachedData)
          const now = new Date().getTime()
          const cacheTime = new Date(parsedData.timestamp).getTime()

          // Se i dati sono più vecchi di 5 minuti, esegui la fetch
          if (now - cacheTime < cacheExpiration) {
            console.log('Dati recuperati dal localStorage:', parsedData)
            return parsedData
          }
        }

        return resultWithTimestamp
      } catch (error) {
        console.error('Errore nella fetch:', error)
        return null
      }
    }
    case 'force': {
      // Gestione dell'azione 'force'
      break
    }
    default: {
      // Gestione dell'azione predefinita
      break
    }
  }

  // Controllo cache nel localStorage
}

export default getMe

/**
 * Note di utilizzo:
 *
 * 1. Recuperare i dati (utilizza la cache se valida):
 *    (async () => {
 *      try {
 *        const data = await getMe();
 *        console.log('Dati utente:', data);
 *      } catch (error) {
 *        console.error('Errore nel recupero dei dati:', error);
 *      }
 *    })();
 *
 * 2. Forzare la fetch (ignora la cache):
 *    (async () => {
 *      try {
 *        const data = await getMe('force');
 *        console.log('Dati aggiornati:', data);
 *      } catch (error) {
 *        console.error('Errore nel recupero dei dati aggiornati:', error);
 *      }
 *    })();
 *
 * 3. Cancellare i dati salvati nel localStorage:
 *    (async () => {
 *      try {
 *        await getMe('delete');
 *        console.log('Dati cancellati dal localStorage');
 *      } catch (error) {
 *        console.error('Errore nella cancellazione dei dati:', error);
 *      }
 *    })();
 */

export const Auth => {
  if (token) {
    return <UserFetcher>
      <Routes>
        // routes qui nécessitent d'être connectés + les routes publiques
      </Routes>
    </UserFetcher>
  } else {
    <Routes>
      // publiques
    </Routes>
  }
}

const UserFetcher = () => {
  useEffect(() => {
    getMe()
      .then( storeMe )
      .catch(
        souvenir de l'url
        removeToken
        redirectLogin avec url souvenue en parametre
      )
  }, [])

  if (menubar.loading) {
    return <>loading</>
  }

  if (menubar.success) {
    return children
  }
}
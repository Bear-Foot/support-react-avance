import { useToggle } from '../hooks/toggle'

export const NewsLetter = () => {
  const isSubscribed = useToggle()

  return (
    <div>
      <h1>Abonnez-vous !</h1>
      <label htmlFor="subscribe">
        <span>Je souhaite recevoir des emails inutiles:</span>
        <input
          type="checkbox"
          checked={isSubscribed.state}
          id="subscribe"
          onChange={isSubscribed.toggle}
        />
      </label>
      <div>
        {isSubscribed.state ? 'Très bien, vive le spam' : 'Dommage...'}
      </div>
    </div>
  )
}

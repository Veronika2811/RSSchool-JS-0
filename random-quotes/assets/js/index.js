import digitalClock from './watch.js'
import musicSubscribe from './musicPlayer.js'
import imageSubscribe from './background.js'
import quotesSubscribe from './randomQuotes.js'

window.onload = () => {
  digitalClock();
  musicSubscribe();
  imageSubscribe();
  quotesSubscribe();
}
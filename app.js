const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const movies = movieList.results.filter(movie => { return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase()) })
  res.render('index', { movies: movies, keyword: req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.filter(movie => movie.id == req.params.movie_id)
  res.render('show', { movie: movie[0] })
})

app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})
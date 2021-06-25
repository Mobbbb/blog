<template>
  	<MoviePage msg="Welcome to Your Vue.js App"/>
</template>

<script>
import MoviePage from './single-page/movie/movie-page.jsx'

export default {
  	name: 'App',
  	components: {
    	MoviePage
  	}
}
</script>

<style>
body, div{
	padding: 0;
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	padding: 0 12px 12px 12px;
}
</style>

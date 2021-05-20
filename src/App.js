import React from 'react'

import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import { fetchData } from './api/index'
import styles from './App.module.css'
import coronaImage from './images/COVID-19 icon.png'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Paper, Switch, CssBaseline } from '@material-ui/core'
class App extends React.Component {
  state = {
    data: {},
    country: '',
    darkMode: false
  }

  async componentDidMount() {
    const fetchedData = await fetchData()
    this.setState( {data: fetchedData})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState( {data: fetchedData, country: country} )
  }

  changeTheme = () => {
    if(this.state.darkMode){
      this.setState( {darkMode: false} )
    } else {
      this.setState( {darkMode: true} )
    }
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: this.state.darkMode ? "dark" : "light"
      }
    })
    
    const { data, country } = this.state
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className = {styles.container} >
            <Switch className={styles.switch1} checked={this.state.darkMode} onChange={this.changeTheme}></Switch>
            <img className={styles.image} src={coronaImage}></img>
            <Cards data = {data} />
            <CountryPicker handleCountryChange={this.handleCountryChange}/>
            <Chart data={data} country={country}/>
          </div>
        </CssBaseline>
      </ThemeProvider>
    )
  }
}

export default App;

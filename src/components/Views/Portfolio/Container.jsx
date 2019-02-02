import React, { Component } from 'react'
import axios from 'axios'
import Overview from 'components/Views/Portfolio/Overview'
import WealthChart from 'components/Views/Portfolio/WealthChart'
import Loading from 'components/Common/Loading'
import Toolbar from 'components/Common/Toolbar'

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=5'

class Container extends Component {
  constructor(props) {
    super(props)

    const storageWealth = JSON.parse(localStorage.getItem('wealth'))
    const storageCurrency = JSON.parse(localStorage.getItem('currency'))

    this.state = {
      isLoading: true,
      chartData: [],
      filteredChart: [],
      rowsToDisplay: 25,
      wealth: storageWealth || [],
      anchorEl: null,
      currency: storageCurrency || 'usd',
    }
  }

  componentDidMount() {
    this.getChart(url)
    this.getWealth()
  }

  getChart = api => {
    axios.get(api).then(res => {
      console.log(res.data)
      this.setState({ chartData: res.data }, () => {
        this.setState({ isLoading: false })
      })
    })
  }

  getWealth = () => {
    // calculate coins to match current price
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  selectCurrency = e => {
    const currency = e.target.getAttribute('value')
    this.setState({ currency }, () => {
      localStorage.setItem('currency', JSON.stringify(currency))
      this.handleClose()
    })
  }

  render() {
    const {
      isLoading,
      anchorEl,
      currency,
      chartData,
      rowsToDisplay,
      filteredChart,
    } = this.state

    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Toolbar
              handleClick={e => {
                this.handleClick(e)
              }}
              handleClose={e => {
                this.handleClose(e)
              }}
              selectCurrency={e => {
                this.selectCurrency(e)
              }}
              handleSearch={e => {
                this.handleSearch(e)
              }}
              anchorEl={anchorEl}
              currency={currency}
            />
            <Overview />
            <WealthChart
              chartData={chartData}
              filteredChart={filteredChart}
              // userInput={userInput}
              currency={currency}
              rowsToDisplay={rowsToDisplay}
              favoritedItem={this.favoritedItem}
              toggleFavorite={this.toggleFavorite}
            />
          </>
        )}
      </>
    )
  }
}

export default Container

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class ProductInfo extends React.Component {
  createTags(tags = []) {
    let tagsDisplay = []
    for (var i = 0; i < tags.length; i++) {
      tagsDisplay = tagsDisplay.concat(<div key={tags[i]} className="tag">{tags[i]}</div>);
    }

    return tagsDisplay;
  }

  render() {
    const productInfo = this.props.productInfo;
    return (
      <div className="sidebar">
        <div className="product-img">
          <img
            src={productInfo.image}
            alt={productInfo.brand}
          />
        </div>
        <h1>{productInfo.title}</h1>
        <h3>{productInfo.subtitle}</h3>
        <div className="tags">
          {this.createTags(productInfo.tags)}
        </div>
      </div>
    );
  }
}

class SalesChart extends React.Component {
  renderHeader() {
    const headerItems = {
      weekEnding: "Week Ending",
      retailSales: "Retail Sales",
      wholesaleSales: "Wholesale Sales",
      unitsSold: "Units Sold",
      retailerMargin: "Retailer Margin",
    };

    const headerRow = Object.entries(headerItems).map((title, key) => {
      // className={
      //   this.state.activeSort === key ? 'active' : ''
      // }
      return (
        <th key={key}>
          <label>{title[1]}</label>
          <span
            className="sort"
            onClick={() => this.sort(key)}
          ></span>
        </th>
      );
    });

    return (
      <tr key="head">
        {headerRow}
      </tr>
    );
  }

  renderRow(i) {
    const numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    const dateFormatter = (date) => {
      const sliced = date.split('-');
      const year = sliced[0].slice(2);
      const month = sliced[1];
      const day = sliced[2];

      return [month, day, year].join('-');
    };
    const retailerMargin =  numberFormatter.format(this.props.SalesInfo[i].retailerMargin);
    const retailSales    =  numberFormatter.format(this.props.SalesInfo[i].retailSales);
    const unitsSold      =  this.props.SalesInfo[i].unitsSold;
    const weekEnding     =  dateFormatter(this.props.SalesInfo[i].weekEnding);
    const wholesaleSales =  numberFormatter.format(this.props.SalesInfo[i].wholesaleSales);

    return (
      <tr key={"row" + i}>
        <td>
          {weekEnding}
        </td>
        <td>
          {retailSales}
        </td>
        <td>
          {wholesaleSales}
        </td>
        <td>
          {unitsSold}
        </td>
        <td>
          {retailerMargin}
        </td>
      </tr>
    );
  }

  createSalesChart() {
    let newRow = [];

    for (var i = 0; i < this.props.SalesInfo.length; i++) {
      newRow = newRow.concat(this.renderRow(i));
    }

    return (
      <table>
        <thead>
          {this.renderHeader()}
        </thead>
        <tbody>
          {newRow}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="mainbody">
        <h2>Retail Sales</h2>
        {this.createSalesChart()}
      </div>
    );
  }
}

class App extends Component {
  getProductInfo() {
    return {
      brand:    this.props.productStore.brand,
      details:  this.props.productStore.details,
      id:       this.props.productStore.id,
      image:    this.props.productStore.image,
      retailer: this.props.productStore.retailer,
      reviews:  this.props.productStore.reviews,
      subtitle: this.props.productStore.subtitle,
      tags:     this.props.productStore.tags,
      title:    this.props.productStore.title,
    };
  }

  getSales() {
    return this.props.productStore.sales;
  }

  render() {
    const productInfo = this.getProductInfo();
    const salesInfo = this.getSales();

    return (
      <div className="App">
        <header className="App-header">
          Stackline
        </header>
        <main key={productInfo.id}>

          <ProductInfo productInfo={productInfo} />

          <SalesChart SalesInfo={salesInfo} />

        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    productStore: state[0],
  }),
  dispatch => ({})
)(App);

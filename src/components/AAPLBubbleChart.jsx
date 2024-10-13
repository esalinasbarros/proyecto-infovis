// D3BubbleChart.js
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const D3BubbleChart = () => {
  const svgRef = useRef();
  const apiKey = 'uDFT7igHou7SIY1ePwXjyXuHsELrLFc0';
  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'V'];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const cachedData = localStorage.getItem('stockData');
        const cachedTimestamp = localStorage.getItem('stockDataTimestamp');
        const currentTime = new Date().getTime();

        // Check if cached data exists and is less than 24 hours old
        if (cachedData && cachedTimestamp && currentTime - parseInt(cachedTimestamp) < 24 * 60 * 60 * 1000) {
          const stocksData = JSON.parse(cachedData);
          drawChart(stocksData);
          return;
        }

        const stockDataPromises = stockSymbols.map(async (symbol) => {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
          );
          const stockData = response.data[0];
          return {
            marketCap: stockData.marketCap / 1e9,
            symbol: symbol,
          };
        });

        const stocksData = await Promise.all(stockDataPromises);
        stocksData.sort((a, b) => b.marketCap - a.marketCap);

        // Cache the fetched data
        localStorage.setItem('stockData', JSON.stringify(stocksData));
        localStorage.setItem('stockDataTimestamp', currentTime.toString());

        drawChart(stocksData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    const drawChart = (data) => {
      const width = 800;
      const height = 800;

      const sizeScale = d3
        .scaleSqrt()
        .domain([0, d3.max(data, (d) => d.marketCap)])
        .range([20, 100]);

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .style('background', 'rgba(255, 255, 255, 0.1)');

      data.forEach((d) => {
        d.x = width / 2;
        d.y = height / 2;
      });

      const nodes = svg
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .call(
          d3
            .drag()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        );

      nodes
        .append('circle')
        .attr('r', (d) => sizeScale(d.marketCap))
        .attr('fill', (d) => colorScale(d.symbol))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .append('title')
        .text((d) => `${d.symbol}: $${d.marketCap.toFixed(2)}B`);

      const labels = nodes
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', (d) => Math.min(sizeScale(d.marketCap) / 4, 16))
        .attr('fill', '#000');

      labels
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '-0.3em')
        .text((d) => d.symbol);

      labels
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1em')
        .text((d) => `$${d.marketCap.toFixed(2)}B`);

      const simulation = d3
        .forceSimulation(data)
        .force('x', d3.forceX(width / 2).strength(0.2))
        .force('y', d3.forceY(height / 2).strength(0.2))
        .force('collision', d3.forceCollide((d) => sizeScale(d.marketCap) + 3))
        .on('tick', () => {
          nodes.attr('transform', (d) => `translate(${d.x},${d.y})`);
        });
    };

    fetchStockData();
  }, [apiKey]);

  return <svg ref={svgRef}></svg>;
};

export default D3BubbleChart;
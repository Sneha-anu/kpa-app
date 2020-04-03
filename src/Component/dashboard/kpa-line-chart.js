import React from "react";
import * as d3 from "d3";
import { axisBottom, axisLeft } from "d3-axis";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Grid, Typography} from '@material-ui/core';
import moment from 'moment';

class LineChart extends React.Component {
  
  node;
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      kpaTypes: props.kpaTypes
    };
    this.ref = React.createRef();
  }   

  componentDidMount() {
    this.node = this.ref.current;
    this.getLatestDates();    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  createLineGenerator = (type, graphData)=> {
    const { parseDate, x, y } = graphData;
    return d3
      .line()
      .x(d => x(parseDate(d.date)))
      .y(d => y(d[type]));
  }

  createLineGraph = (chartBody, lineGenerator, type, color)=> {
    chartBody
      .append("svg:path")
      .datum(this.state.data)
      .attr("id", "line-" + type)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineGenerator);
  }

  getMaxNumber = ()=> {
    const maxNumber = [];
    this.state.data && this.state.data.map(rec => {
      const count = [];
      this.state.kpaTypes && this.state.kpaTypes.map(kpa => {
        count.push(parseInt(rec[kpa.type]));
      });

      maxNumber.push(Math.max(...count));
    });

    return Math.max(...maxNumber);
  }

  getLatestDates = () =>{    
    let curr = new Date();  
    let previousDate = new Date(moment(curr).subtract(4, 'months'));
    let filteredData = this.state.data && this.state.data.filter(o => {          
        return moment(o.date).isBetween(previousDate, curr, 'month', '[]' );           
    });

    this.setState({data: filteredData},() => {
      
      this.drawLineChart();
    } );    
  }

  lineCircles = (svg, type, color, graphData) => {
    const { parseDate, x, y } = graphData;
    svg
      .selectAll("line-circle")
      .data(this.state.data)
      .enter()
      .append("circle")      
      .attr("stroke", color)      
      .attr("r", 2.5)
      .attr("cx", function(d, i) {
        return x(parseDate(d.date));
      })
      .attr("cy", function(d, i) {
        return y(d[type]);
      })
  }

  drawLineChart = () => {
    const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 25
    };

    let  { width, height } = this.props;

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    const parseDate = d3.timeParse("%Y-%m-%d");
    const maxNumber = this.getMaxNumber() ? this.getMaxNumber() : 10;
    const x = d3
      .scaleTime()
      .domain(d3.extent(this.state.data, d => parseDate(d.date)))
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, maxNumber])
      .range([height, 0]);
    
    const graphData = {
      parseDate: parseDate,
      x: x,
      y: y
    };
    
    const svg = d3
      .select(this.node)
      .append("svg:svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "plot");

    const make_x_axis = () => axisBottom(x).ticks(5);
    const make_y_axis = () => axisLeft(y).ticks(maxNumber);

    const xAxis = axisBottom(x)
      .ticks(5)
      .tickFormat(d3.timeFormat("%b"));

    svg
      .append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("x", "15em")
      .attr("dy", "3.5em")
      .text("April 2019 - April 2020");

    const yAxis = axisLeft(y).ticks(maxNumber);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", "-2.75em")
      .style("text-anchor", "end")
      .text("KPA Counts");

    
    const chartBody = svg.append("g");
    
    this.state.kpaTypes && this.state.kpaTypes.map(kpaType => {
      const lineGenerator = this.createLineGenerator(kpaType.type, graphData);
      this.createLineGraph(
        chartBody,
        lineGenerator,
        kpaType.type,
        kpaType.color
      );
      this.lineCircles(svg, kpaType.type, kpaType.color, graphData);
    });   

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#2d2d30")
      .style("text-decoration", "underline")
  };

  render() {    
    return (
      <div style={{ width: 400 }}>
        <div id="line-chart" ref={this.ref}></div>
        <Grid container spacing={1}>
          {this.state.kpaTypes && this.state.kpaTypes.map((kpa, index) => {
            return (
              <div key={index} style={index === 0 ? {paddingRight: "9px"}: {}}>
              <Grid item xs={1}><TrendingUpIcon style ={{color: kpa.color}} /> </Grid>
              <Grid item xs={2}><Typography variant="caption" >{kpa.label}</Typography></Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default LineChart;

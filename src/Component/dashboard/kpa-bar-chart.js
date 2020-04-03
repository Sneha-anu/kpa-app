import React from "react";
import * as d3 from "d3";

class BarChart extends React.Component {
  node;
  colorKey = ["completed", "pending"];
  colors = ["orange", "red"];
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.node = this.ref.current;
    this.barchart();
  }

  componentDidUpdate() {
    this.barchart();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  barchart = () => {
    const { data } = this.state;

    if (data) {
      let margin = { top: 20, right: 20, bottom: 30, left: 50 };
      let width = 350 - margin.left - margin.right;
      let height = 280 - margin.top - margin.bottom;
      let xScale = d3.scaleLinear().rangeRound([0, width]);
      let yScale = d3
        .scaleBand()
        .rangeRound([height, 0])
        .padding(0.1);
      let color = d3
        .scaleOrdinal()
        .domain(this.colorKey)
        .range(this.colors);
      let xAxis = d3.axisBottom(xScale);
      let yAxis = d3.axisLeft(yScale);
      d3.selectAll("#bar-chart > *").remove();
      let svg = d3
        .select(this.node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const divTooltip = d3
        .select("body")
        .append("div")
        .attr("class", "toolTip");

      const format = xScale.tickFormat(1);

      let stack = d3
        .stack()
        .keys(this.colorKey)
        /*.order(d3.stackOrder)*/
        .offset(d3.stackOffsetNone);

      let layers = stack(data);
      yScale.domain(
        data.map(function(d) {
          return d.name;
        })
      );
      xScale
        .domain([
          0,
          d3.max(layers[layers.length - 1], function(d) {
            return d[0] + d[1];
          })
        ])
        .nice();

      let layer = svg
        .selectAll(".layer")
        .data(layers)
        .enter()
        .append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
          return color(i);
        });

      layer
        .selectAll("rect")
        .data(function(d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("y", function(d) {
          return yScale(d.data.name);
        })
        .attr("x", function(d) {
          return xScale(d[0]);
        })
        .attr("height", yScale.bandwidth())
        .attr("width", function(d) {
          return xScale(d[1]) - xScale(d[0]);
        })

        .on("mouseout", function() {
          divTooltip.style("display", "none");
        })
        .on("mousemove", function(d) {
          divTooltip.style("left", d3.event.pageX + 10 + "px");
          divTooltip.style("top", d3.event.pageY - 25 + "px");
          divTooltip.style("display", "inline-block");
          divTooltip.html(d[1] - d[0]);
        });

      svg
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
    }
  };

  render() {
    const { chartWidth, chartHeight } = this.props.dimensions;
    return (
      <div>
        <svg
          id="bar-chart"
          ref={this.ref}
          width={chartWidth}
          height={chartHeight}
        ></svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: chartWidth
          }}
        >
          <span style={{ color: "orange", fontWeight: "bold", fontSize: 12 }}>
            Completed
          </span>
          <span style={{ color: "red", fontWeight: "bold", fontSize: 12 }}>
            Pending
          </span>
        </div>
      </div>
    );
  }
}

export default BarChart;

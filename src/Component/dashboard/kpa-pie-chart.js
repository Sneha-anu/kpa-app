import React, { Component } from "react";
import * as d3 from "d3";

class PieChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.drawChart();
    console.log(this.props)
  }

  componentDidUpdate(){
      this.drawChart();
  }

  drawChart() {
    const data = [
      {
        nodeData: {
          kpa: "Component",
          kpacolor: "component",
          kpacount: this.props.totKpa[0]
        },
        subData: [
          {
            nodeData: {
              kpa: this.props.completedComp,
              kpacolor: "compcompleted",
              kpacount: this.props.completedComp
            }
          },
          {
            nodeData: {
              kpa: this.props.remainingComp,
              kpacolor: "compsub",
              kpacount: this.props.remainingComp
            }
          }
        ]
      },
      {
        nodeData: {
          kpa: "Master Class",
          kpacolor: "master",
          kpacount: this.props.totKpa[1]
        },
        subData: [
          {
            nodeData: {
              kpa: this.props.completedMast,
              kpacolor: "mastercompleted",
              kpacount: this.props.completedMast
            }
          },
          {
            nodeData: {
              kpa: this.props.remainingMast,
              kpacolor: "mastersub",
              kpacount: this.props.remainingMast
            }
          }
        ]
      },
      {
        nodeData: {
          kpa: "Tech Session",
          kpacolor: "tech",
          kpacount: this.props.totKpa[2]
        },
        subData: [
          {
            nodeData: {
              kpa: this.props.completedTech,
              kpacolor: "techcompleted",
              kpacount: this.props.completedTech
            }
          },
          {
            nodeData: {
              kpa: this.props.remainingTech,
              kpacolor: "techsub",
              kpacount: this.props.remainingTech
            }
          }
        ]
      }
    ];
    const width = 500,
      height = 450,
      maxRadius = Math.min(width, height) / 2.8;

    const colorScale = d3
      .scaleOrdinal()
      .domain([
        "component",
        "compcompleted",
        "compsub",
        "master",
        "mastercompleted",
        "mastersub",
        "tech",
        "techcompleted",
        "techsub"
      ])
      .range([
        "#5eba7d",
        "#3E975C",
        "#7DF1A4",
        "#fdcc8a",
        "#FFBC5F",
        "#F6D09C",
        "#4478F1",
        "#2C5DD0",
        "#6693FD"
      ]);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var multiLevelData = [];
    var setMultiLevelData = function(data) {
      if (data == null) return;
      var level = data.length,
        counter = 0,
        index = 0,
        currentLevelData = [],
        queue = [];
      for (var i = 0; i < data.length; i++) {
        queue.push(data[i]);
      }

      while (!queue.length == 0) {
        var node = queue.shift();
        currentLevelData.push(node);
        level--;

        if (node.subData) {
          for (var i = 0; i < node.subData.length; i++) {
            queue.push(node.subData[i]);
            counter++;
          }
        }
        if (level == 0) {
          level = counter;
          counter = 0;
          multiLevelData.push(currentLevelData);
          currentLevelData = [];
        }
      }
    };

    var drawPieChart = function(_data, index) {
      var pie = d3
        .pie()
        .sort(null)
        .value(function(d) {
          return d.nodeData.kpacount;
        });
      var arc = d3
        .arc()
        .outerRadius((index + 1) * pieWidth - 2)
        .innerRadius(index * pieWidth);

      var g = svg
        .selectAll(".arc" + index)
        .data(pie(_data))
        .enter()
        .append("g")
        .attr("class", "arc" + index);

      g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
          return colorScale(d.data.nodeData.kpacolor);
        });

      g.append("text")
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) {
          if (d.data.nodeData.kpa != 0) {
            return d.data.nodeData.kpa;
          } else {
            return;
          }
        });
    };

    setMultiLevelData(data);

    var pieWidth =
      parseInt(maxRadius / multiLevelData.length) - multiLevelData.length;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    for (var i = 0; i < multiLevelData.length; i++) {
      var _cData = multiLevelData[i];
      drawPieChart(_cData, i);
    }
  }

  render() {
    return <div id={"#" + this.props.id}></div>;
  }
}

export default PieChart;

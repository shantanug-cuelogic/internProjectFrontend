import React from 'react';
import { PieChart, Pie, Sector, Cell,LabelList, Legend, Tooltip } from 'recharts';
import randomColor from 'randomcolor';
import axios from 'axios';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{payload.name}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class TwoLevelPieChart extends React.Component{

    state={
        activeIndex:0,
        postData : []
    }

    componentDidMount() {
        console.log(this.props.userId)
        axios.get('viewsperpost/'+this.props.userId)
        .then((response) => {
            console.log(response.data.result);
            if(response.data.success) {
               
                this.setState ({
                   postData : [...response.data.result]
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    getInitialState() {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }
	render () {
  
        
        let data = [];
        
        this.state.postData.map((element, index)=>{
            let post = {
                name: element.title,
                value : element.views
            }
            data.push(post);
        })
       
       
        const COLORS = randomColor({
            count: this.state.postData.length,
            hue: '#3f50b5'
        })
  
        return (
    	<PieChart width={800} height={400}>
        <Pie 
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape} 
          data={data} 
          cx={415} 
          cy={200} 
          innerRadius={60}
          outerRadius={120} 
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
       >
                {
                        data.map((entry, index) =>
                
                 <Cell fill={COLORS[index % COLORS.length]} />
                //  <LabelList dataKey={entry.name} position="insideTop" angle="45"  />    
                     )
                    }
       </Pie>
       
       </PieChart>
    );
  }
}


export default TwoLevelPieChart;

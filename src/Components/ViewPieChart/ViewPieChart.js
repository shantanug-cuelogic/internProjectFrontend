import React from 'react';
import { PieChart, Pie, Sector, Cell,LabelList } from 'recharts';
import randomColor from 'randomcolor';
import axios from 'axios';




const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class ViewPieChart extends React.Component {


    state = {
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


    render() {

        console.log(this.state.postData);

        


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
            <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={true}
                    label={true}
                    outerRadius={100}
                    fill="#8884d8"
                >
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                     <LabelList dataKey="name" position="insideTop" angle="45"  />
                </Pie>
            </PieChart>
        );
    }
}

export default ViewPieChart;

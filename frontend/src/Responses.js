import React, { Component } from "react";
import { Container, Header, Form, Divider, Button, Grid } from 'semantic-ui-react'
import axios from "axios";
import questions from "./questions.js"
import { Chart } from 'react-google-charts';

const colors = [
    '#3E7DCC',
    '#F8614A',
    '#8F9CB3',
    '#B0659C',
    '#00C8C8',
    '#E5BEBE',
    '#FF905A',
    '#F9D84A',
    '#8CC0FF',
    '#4D525A'
]

const PieChartSection = (props) => (
    <Container textAlign='center' style={{ marginTop: "4em" }}>
        <Header as='h2'>{props.question}</Header>
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            data={props.data}
            options={{
                width: 600,
                height: 300,
                bar: { groupWidth: '85%' },
                legend: { position: 'none' },
            }}
        />
    </Container>
);


export default class Responses extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        questions.map(currentQuestion => { 
            this.state[currentQuestion.question] = {}
            currentQuestion.options.map(option => {
                this.state[currentQuestion.question][option] = 0
            })
        })

        console.log(this.state)
    }

    componentDidMount() {
        
        axios.get("/api/responses")
            .then(response => {
                console.log(response)
                const data = response.data
                data.map(surveyEntry => {
                    const questions = surveyEntry.questions
                    const responses = surveyEntry.responses

                    for (let [index, question] of questions.entries()) {
                        const questionResponse = responses[index]
                        if (this.state[question]) {
                            if (this.state[question][questionResponse] != null) {
                                this.state[question][questionResponse]++
                            }
                        }
                    }
                })
                this.setState(this.state)                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    pieChartList() {
        const piecharts = []

        for (const [question, responses] of Object.entries(this.state)) {
            const data = [[
                'Question',
                'Votes',
                { role: 'style' },
                {
                    sourceColumn: 0,
                    role: 'annotation',
                    type: 'string',
                    calc: 'stringify',
                }
            ]]
            let index = 0
            for (const [response, value] of Object.entries(responses)) {
                data.push([response, value, colors[index], value])
                index++
            }
            piecharts.push(<PieChartSection question={question} data={data} />)
        }

        return piecharts;
    }


    render() {
        return (
            <Container>
                {this.pieChartList()}  
            </Container>
        )
    }
}
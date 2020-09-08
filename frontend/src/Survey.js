import React, { Component } from "react";
import { Container, Header, Form, Divider, Button } from 'semantic-ui-react'
import axios from "axios";
import questions from "./questions.js"

const Question = (props) => (
    <Form.Group grouped>
        <Header as='h4' style={{ color: "#246EB9" }}>{props.question.question}</Header>
        {props.question.options.map((option) => {
            return <Form.Radio
                        label= {option}
                        name={props.question.question}
                        value= {option}
                        checked={props.parent.state[props.question.question] === option}
                        onChange={props.parent.handleChange}
                    />
        })}
        <Divider />
    </Form.Group>
);


export default class Survey extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            submitted: false,
        };

        questions.map((entry) => this.state[entry.question] = "")
    }

    handleChange = (e, { name, value }) => {
        this.setState({[name]: value})
    }

    handleSubmit = () => {
        this.setState({submitted: true})

        delete this.state.submitted
        const body = {
            survey: this.state
        }

        axios.post("/api/responses/record", body)
            .then(res => { console.log(res) })
            .catch((error) => { console.log(error) })
    }

    questionsList() {
        return questions.map((currentQuestion) => {
            return <Question question={currentQuestion} parent={this} />;
        });
    }

    render() {
        return (
            !this.state.submitted ?
            <Container textAlign='left' style={{ marginTop: "3em" }}>
                <Form onSubmit={this.handleSubmit}>
                    {this.questionsList()}
                        <Button type='submit' color='blue' style={{ marginBottom: "3em", marginTop: "1em" }}>Submit</Button>
                </Form>
            </Container>
            :
            <Header as='h1' color='blue' style={{ marginTop: "3em", color: "#246EB9" }}>
                Thank you for your responses!
            </Header>
        )
    }
}
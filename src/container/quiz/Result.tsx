import React from 'react';
import { Link } from 'react-router-dom'
import CONSTANT from '../../Constant';
import rawJson from '../../mock/data.json';
import "./quiz.css"


class Result extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            questions: rawJson,
            answerSheet: undefined,
            redirection: true
        }
    }
    
    componentDidMount(){
        const answerSheetString:any = localStorage.getItem(CONSTANT.key.answerSheet);
        const answerSheet =JSON.parse(answerSheetString);

        this.setState({ answerSheet });
    }

    render() {    
        return (
            <div className="container">
                <div className="row">
                    {this.renderSummary()}
                </div>
            </div>
        )
    }

    renderSummary = () => {
        const { questions, answerSheet } = this.state;
        let totalMarks = 0;
        return (
            <div className="col-md-12">
                <div className='bg-gray p-3 mt-5'>
                    <strong>Resultados</strong>
                    <hr/>
                    <ol>
                        {
                            questions.map((item:any, index:number) => {
                                let isCorrectAnswer = undefined;
                                let marks = 0;

                                if (answerSheet){
                                    const correctAnswer = item.answers.filter((i:any) => i.isCorrectAnswer);
                                    const userQuestion = answerSheet.filter((i:any) => i.id === item.id)[0];
                                    const userAnswer = userQuestion.answers.filter((i:any) => i.checked);
                                    
                                    let counter = 0;

                                    for(let j=0; j < userAnswer.length; j++){
                                        const match = correctAnswer.filter((i: any) => i.id === userAnswer[j].id);
                                        if(match.length > 0){
                                            counter++;
                                        }else{
                                            counter--;
                                        }
                                    }

                                    if(counter === correctAnswer.length){
                                        isCorrectAnswer = true;
                                        marks = 1;
                                    }else if(counter > 0 && counter < correctAnswer.length){
                                        isCorrectAnswer = true;
                                        marks = counter / correctAnswer.length;
                                    }else{
                                        marks = 0;
                                    }

                                    totalMarks += marks;
                                }
                                return (
                                    <li >
                                        <p>{item.summary}</p>
                                        <div>
                                            {isCorrectAnswer && isCorrectAnswer ? <small className='text-success'>Respuesta correcta</small> : <small className='text-danger'>Respuesta incorrecta</small>}
                                            {marks !== 0 && <small className="text-primary">Puntaje: {marks}</small>}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <hr/>
                    <Link to={CONSTANT.url.start} className='btn btn-block btn-primary'>Intentar nuevamente</Link>
                    <Link to={CONSTANT.url.customConnect} className='btn btn-block btn-primary float-end'>Ir a inicio</Link>
                </div>
            </div>
        )
    };
}

export default Result; 
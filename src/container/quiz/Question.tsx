import React from 'react';
import CONSTANT from '../../Constant';
import rawJson from '../../mock/data.json';
import  {Navigate} from 'react-router-dom';

class Quiz extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            questions: rawJson,
            activeIndex: 0,
            redirection: false
        }
    }
    
    componentDidMount(){
        const { questions } = this.state;
        let timer = [];

        // convierte la estructura json al formato requerido...

        const clonedQuestions = JSON.parse(JSON.stringify(questions));

        // recupero la encuestas y las opciones...

        for(let i = 0; i < clonedQuestions.length; i++){
            const question = clonedQuestions[i];
            timer[i] = (question.lifetimeSeconds * 1000);    
            console.log(timer[i]);        
            
            for(let j = 0; j < question.answers.length; j++){
                const answer = question.answers[j];
                answer.checked = false;
               
                delete answer.isCorrectAnswer;
            }

            // si vence el tiempo, salteo ...
            setTimeout(this.onChangeTimer,  timer[i]);
           
        } 

        // actualizo el estado ...
        this.setState ({ questions: clonedQuestions });
    }

    render() {  
        {
            if(this.state.redirection)  return  <Navigate to = {CONSTANT.url.result} />
        }  
        return (
            <div className='container'>
                <div className="row">
                    {this.renderQuestion()}
                    {this.renderSummary()}
                </div>
            </div>
        )
    }

    renderQuestion = () => {
        const { questions, activeIndex } = this.state;

        return (
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-gray p-3 mt-5 br-3">
                            <div className="row" dangerouslySetInnerHTML={{ __html: questions[activeIndex].body }}></div>
                            <div className="mt-3">
                                {
                                    questions[activeIndex].answers.map((item: any, i: number) => {
                                        const questionId = questions[activeIndex].id;
                                        return (
                                            <div key = {i}>
                                                <label>
                                                    <input type="checkbox" onChange={this.onChange} data-question-id={questionId} data-answer-id={item.id} className="mr-3" checked={item.checked}></input>
                                                    {item.body}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                     <div className="col-md-12 mt-3">
                        {
                        activeIndex < questions.length - 1 && <button onClick= {this.onChangeQuestion} data-index = {activeIndex + 1 } className="btn btn-success float-end"> Siguiente</button>
                        } 
                    </div> 
                </div>
            </div>
        )
    };

    renderSummary = () => {
        const { questions } = this.state;
        return (
            <div className="col-md-4">
                <div className='bg-gray p-3 mt-5 br-3'>
                    <strong>Resumen</strong>
                    <hr/>
                    <ol className='p1-3'>
                        {
                            questions.map((item:any, index:number) => {
                                const answered = item.answers.filter((i:any) => i.checked).length > 0;
                                return (
                                    <li key={ index }>
                                        <p onClick={this.onChangeQuestion} data-index={index}>
                                            {item.summary}
                                        </p>
                                        <div>
                                            {answered && <small className="text-success">Respondida</small>}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <hr/>
                    <button className='btn btn-block btn-primary' onClick={ this.onShowResult} >Enviar encuesta</button>
                    
                </div>
            </div>
        )
    };

    onChange = (e: any) => {
       const checked = e.target.checked;
       const answerId = parseInt(e.target.dataset.answerId);
       const questionId = parseInt(e.target.dataset.questionId);
       
       const {questions} = this.state;
       const clonedQuestions = JSON.parse(JSON.stringify(questions));

       for(let i = 0; i < clonedQuestions.length; i++) {
            const question = clonedQuestions[i];

            if(question.id === questionId) {
                for(let j = 0; j < question.answers.length; j++) {
                    const answer = question.answers[j];
                    if(answer.id === answerId){
                        answer.checked = checked;
                    }
                }
            }
       }
       this.setState( { questions: clonedQuestions });
    };

    // cambio de pregunta ...
    onChangeQuestion = (e: any) => {
        const activeIndex = parseInt(e.target.dataset.index);
        this.setState( { activeIndex } );
    };

    // cambio de pregunta si vence el tiempo...
    onChangeTimer = () => {
        let { questions, activeIndex } = this.state;

        if ( activeIndex < questions.length - 1 ) {
            activeIndex = activeIndex + 1;
            this.setState( { activeIndex } );
        }
    }

    // muestro los resultados ...
    onShowResult = () => {
        const isSure = window.confirm('Seguro que quiere enviar los resultados?');
        
        if(isSure){
            localStorage.setItem(CONSTANT.key.answerSheet, JSON.stringify(this.state.questions)); 
            this.setState ({ redirection: true });  
        }
    }
}
 
export default Quiz;

    

import { useEthers, useEtherBalance, useTokenBalance, } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import './wallet.css'
import { Link } from 'react-router-dom';
import CONSTANT from '../../Constant';


function Connect() {

    const { activateBrowserWallet, deactivate, account } = useEthers();
    const etherBalance = useEtherBalance(account);
    
    // direccion de quiz y dai
    const QUIZ = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72';
    const DAI  = '0x6b175474e89094c44da98b954eedeac495271d0f';
    
    // Recupero el token con la cuenta
    const quizBalance = useTokenBalance(QUIZ, account);
    const daiBalance = useTokenBalance(DAI, account);

    // retorno
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className='titulo'>
                        { !account && <p> ¡BIENVENIDO! Para continuar hacia la encuesta debe conectar con metamask. </p>}
                        { account && <p> FELICITACIONES, USTED SE ENCUENTRA CONECTADO, PUEDE CONTINUAR. </p>}
                        { account && <p>Account: {account}</p>}    
                        { !account && <button className="btn btn-primary " onClick={() => { activateBrowserWallet(); }} >Conectar</button>}
                        { account && <button className="btn btn-primary " onClick={() => {deactivate();}}>Desconectar</button> }          
                    </div>
                    <div className='row mt-5'>
                        <div className="col-md-4 bg-gray">
                        {quizBalance && (
                            <div className="balance">
                            <br />
                            <strong>QUIZ Balance:</strong>
                            <p>{formatEther(quizBalance)} QUIZ</p>
                            </div>
                        )}
                        </div>
                        <div className="col-md-4 bg-gray">
                        {etherBalance && (
                            <div className="balance">
                            <br />
                            <strong>ETH Balance:</strong>
                            <p className="bold">{formatEther(etherBalance)} ETH</p>
                            </div>
                        )}
                        </div>
                        <div className="col-md-4 bg-gray">
                        {daiBalance && (
                            <div className="balance">
                            <br />
                            <strong>DAI Balance:</strong>
                            <p className="bold">{formatEther(daiBalance)} DAI</p>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className='iniciar'>
                        {  account && <Link to={CONSTANT.url.question} className='btn btn-primary'>Comenzar Encuesta</Link> }
                    </div>
                </div>
                
            </div>
        </div>
    )

}



export default Connect;
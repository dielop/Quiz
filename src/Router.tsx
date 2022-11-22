import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CONSTANT from './Constant';

import Start from './container/quiz/Start';
import Question from './container/quiz/Question';
import Result from './container/quiz/Result';
import CustomConnect from './container/wallet/CustomConnect'
import error404 from './container/error/error404';

const Router = (props: any) => {
    return (
        <Routes>
            <Route exact={true} path={CONSTANT.url.home} element={<CustomConnect/>} />
            <Route exact={true} path={CONSTANT.url.customConnect} element={<CustomConnect/>} />
            <Route exact={true} path={CONSTANT.url.start} element={<Start/>} />
            <Route exact={true} path={CONSTANT.url.question} element={<Question/>} /> 
            <Route exact={true} path={CONSTANT.url.result} element={<Result/>} />
            <Route element={error404} />
        </Routes>
    )
}

export default Router;
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper"

export const useFetchQuestion = () => {
    const [getData, setGetData] = useState({ isloading: false, apiData: [], serverError: [] })
    const dispatch = useDispatch()
    useEffect(() => {
        setGetData(prev => ({ ...prev, isloading: true }))
            // Use an async function here
            ; (async () => {
                try {
                    const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                    if (questions.length > 0) {
                        setGetData(prev => ({ ...prev, isloading: false }))
                        setGetData(prev => ({ ...prev, apiData: questions }))
                        dispatch(Action.startExamAction({ question: questions, answers }))
                    } else {
                        throw new Error("No Question")
                    }
                } catch (error) {
                    setGetData(prev => ({ ...prev, isloading: false }))
                    setGetData(prev => ({ ...prev, serverError: error }))
                }
            })()
    }, [dispatch])

    return [getData, setGetData]
}

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
        console.log(error)
    }
}

'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cls from './wrapperApexGraph.module.scss'
import {Select} from "../select/Select";
import {ApexGraph} from "../apexGraph/ApexGraph";
import {IData} from "../../page";

export const SELECT = {
    YEAR: 'year',
    HALF_YEAR: 'half_year',
    MONTH: 'month'
} as const

export interface IWrapperApexGraphProps {
    data: IData
}

export const WrapperApexGraph = ({data}: IWrapperApexGraphProps) => {

    const [selectedData, setSelectedData] = useState<{ [key: string]: Record<string, number> }>({})
    const [values, setValues] = useState<Record<keyof IData, string>>({id: SELECT.YEAR, value: 'За последний год'})

    useEffect(() => {
        if (data) {
            setSelectedData({[values.id]: data[values.id]})
        }
    }, [data, values.id])

    const optionsList = useMemo(() => [
        {id: SELECT.YEAR, value: "За последний год"},
        {id: SELECT.HALF_YEAR, value: "За последние 6 месяцев"},
        {id: SELECT.MONTH, value: "За последний месяц"}
    ], [])

    const onChange = useCallback((id: string) => {
        const selectedOption = optionsList.find((option) => option.id === id)
        console.log(selectedOption)
        if (selectedOption) {
            const {id, value} = selectedOption
            setValues({id, value})
            setSelectedData({[id]: data[id]})
        }
    }, [data, optionsList])

    return (
        <div className={cls.wrapper}>
            <Select optionsList={optionsList}
                    onChange={onChange}
                    value={values.value}
                    id={values.id}
            />
            <ApexGraph selectedData={selectedData}/>
        </div>
    );
};
